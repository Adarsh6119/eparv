# Eparv — VPS Deployment Guide

Production deployment for a low-cost Linux VPS (₹1,000–₹5,000/month budget).
Two supported paths: **Docker** (recommended, fewer moving parts) or **bare Node**.
Either way the app sits behind **Nginx with HTTPS** and talks to **PostgreSQL**.

## Vercel deployment

Payload is initialized while Next.js collects static page parameters during the
build, so the build environment must have a `PAYLOAD_SECRET`. Do not add a
fallback secret to the source code.

In **Vercel → Project → Settings → Environment Variables**, add these values
for every environment you deploy (Production and Preview):

```env
PAYLOAD_SECRET=<a unique random secret>
DATABASE_ADAPTER=postgres
DATABASE_URL=<your reachable PostgreSQL connection string>
NEXT_PUBLIC_SERVER_URL=https://<your-domain>
```

Generate a secret locally with
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`,
then paste its output as the `PAYLOAD_SECRET` value in Vercel. Keep this value
stable across deployments and do not commit it. After saving the variables,
redeploy so they are available during the build. The database must be reachable
from Vercel during build because dynamic page paths are loaded from Payload.

---

## 1. Server requirements

- Ubuntu 24.04 LTS (or 22.04), 1–2 vCPU, 2 GB RAM minimum (Payload + Next build
  comfortably fit 2 GB; building on a 1 GB box needs swap).
- 20 GB disk (OS + app + Postgres + backups).
- A domain with DNS access (e.g. `eparv.in`), an `A` record pointing at the VPS IP.

## 2. Recurring cost estimate (monthly, IND approximate)

| Item                              | Estimate                    |
| --------------------------------- | --------------------------- |
| VPS 2 vCPU / 2–4 GB (Hetzner/DO/E2E) | ₹400–₹1,200              |
| Domain (annual, amortised)        | ₹60–₹100                    |
| Backups (VPS snapshot or object storage) | ₹30–₹150             |
| Transaction email for lead alerts (SMTP) | ₹0 (low volume)–₹300 |
| **Total**                         | **≈ ₹500–₹1,750 / month**   |

Fits the ₹1,000–₹5,000 budget with headroom. HTTPS is free via Let's Encrypt.
No managed database needed at this scale; Postgres runs on the same VPS.

## 3. Provision the server

```bash
ssh root@YOUR_SERVER_IP
adduser eparv && usermod -aG sudo eparv
# SSH hardening, firewall:
sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable
```

## 4. Option A — Docker deployment (recommended)

```bash
# Docker Engine
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker eparv

# App
git clone <your-repo-url> eparv && cd eparv
cp .env.example .env
nano .env   # set the production values (below), generate secrets as instructed
docker compose up -d --build
docker compose exec eparv node node_modules/payload/bin.js migrate   # create schema
```

`.env` for production (Docker reads the `${...}` values from it):

```env
DATABASE_ADAPTER=postgres
DATABASE_URL=postgresql://eparv:<postgres-password>@postgres:5432/eparv
POSTGRES_PASSWORD=<generate>
PAYLOAD_SECRET=<generate 32-byte hex>
NEXT_PUBLIC_SERVER_URL=https://eparv.in
CRON_SECRET=<generate>
PREVIEW_SECRET=<generate>
```

Generate secrets: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## 5. Option B — bare Node deployment

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs postgresql nginx git
sudo -u postgres createuser eparv --pwprompt
sudo -u postgres createdb eparv -O eparv

git clone <your-repo-url> eparv && cd eparv
npm ci
npm run build

# Migrations (first deploy and after schema changes)
DATABASE_ADAPTER=postgres DATABASE_URL=postgresql://eparv:...@localhost:5432/eparv \
  npm run migrate
```

Run it under systemd — `/etc/systemd/system/eparv.service`:

```ini
[Unit]
Description=Eparv website
After=network.target postgresql.service

[Service]
Type=simple
User=eparv
WorkingDirectory=/home/eparv/eparv
EnvironmentFile=/home/eparv/eparv/.env
Environment=NODE_ENV=production PORT=3000
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload && sudo systemctl enable --now eparv
journalctl -u eparv -f        # logs
```

## 6. Nginx reverse proxy + HTTPS

`/etc/nginx/sites-available/eparv`:

```nginx
server {
    listen 80;
    server_name eparv.in www.eparv.in;

    client_max_body_size 10M;   # media + CSV uploads

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/eparv /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d eparv.in -d www.eparv.in   # auto-HTTPS + renewal
```

Note: `X-Forwarded-For` is what the lead rate-limiter reads — keep those headers.

## 7. Database backups

Daily dump + 7-day retention (cron):

```bash
sudo -u postgres pg_dump eparv | gzip > /var/backups/eparv/eparv-$(date +\%F).sql.gz
find /var/backups/eparv -name '*.sql.gz' -mtime +7 -delete
```

Restore: `gunzip -c dump.sql.gz | sudo -u postgres psql eparv`
Also enable VPS-provider snapshots if the budget allows.

## 8. Deploy / rollback procedure

```bash
# deploy
cd ~/eparv && git pull && npm ci && npm run build
sudo systemctl restart eparv        # (docker: docker compose up -d --build)

# rollback — keep the previous release around
cd ~/eparv-releases && ln -sfn eparv-<previous-tag> ~/eparv && sudo systemctl restart eparv
```

Migrations are append-first; to roll back a bad release, restore the previous
build first and only revert the database from a pre-deploy backup if the schema
changed (`pg_dump` before every deploy that includes migrations).

## 9. Monitoring

- Uptime: a free external monitor (UptimeRobot/BetterStack) pinging `/`.
- Errors: `journalctl -u eparv` (systemd) or `docker compose logs -f`.
- Optionally add a CRON job hitting `/api/payload-jobs/run` with `CRON_SECRET`
  if background jobs are ever configured.

## 10. Post-deploy checklist

1. Visit `https://eparv.in/admin`, log in, **change the admin password** (or delete
   the dev admin and create a real one).
2. Delete or edit the demo products/dealers; uncheck `isDemoData` only when the
   data is verified.
3. Set `NEXT_PUBLIC_SERVER_URL` to the real domain and verify sitemap URLs.
4. Add the GSC verification token, then submit the sitemaps in Search Console.
5. Send a test lead through every form; confirm the CRM entry and export.
6. Confirm the nightly backup cron ran.
