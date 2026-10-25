# Roadmap — not yet implemented

Intentionally out of scope of the current build, with the plan for each.

## Online payments / checkout (Phase 8)

The catalogue is structured so direct sales can be added without redesign:

- `Products` already carry price, promotional price and availability.
- A future `Orders` collection and cart would live beside `Leads`.

To activate:

1. Create a Razorpay account; store `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`,
   `RAZORPAY_WEBHOOK_SECRET` in the environment only.
2. Server-side order creation via the official `razorpay` SDK; store order and
   payment status **separately**.
3. Webhook endpoint verifying HMAC signatures; handle duplicate deliveries
   idempotently; never treat the frontend redirect as proof of payment.
4. Pending / successful / failed / cancelled states; no raw card data stored.
5. Before real sales: configure taxes (GST), shipping/delivery zones, returns
   policy and stock tracking, and test the full flow in Razorpay test mode.

## Other planned items

- **Scheduled bulk publishing** — the import manager creates drafts and the
  approval workflow is manual; a batch "approve all" with per-page preview
  could be added, but per-page review was chosen deliberately for quality.
- **Background job queue for very large imports** — current limit is 500 rows
  per import processed inline; a jobs-queue path exists (Payload `jobs`) if
  batch sizes must grow.
- **Redis-backed rate limiting** — swap the in-memory limiter if the app is
  ever scaled beyond a single Node process.
- **Image CDN** — Next image optimization is active; an external CDN can be
  added later for scale.
- **Transactional emails beyond lead alerts** (welcome/confirmation emails).
