/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Suitable for a single-process deployment (the VPS setup documented in
 * DEPLOYMENT.md runs one Node process behind Nginx). If the app is ever
 * scaled horizontally, swap this for a shared store such as Redis.
 */

const buckets = new Map<string, number[]>()

const MAX_TRACKED_KEYS = 50_000

const pruneIfLarge = () => {
  if (buckets.size <= MAX_TRACKED_KEYS) {
    return
  }
  const now = Date.now()
  for (const [key, timestamps] of buckets) {
    const alive = timestamps.filter((t) => now - t < 3_600_000)
    if (alive.length === 0) {
      buckets.delete(key)
    } else {
      buckets.set(key, alive)
    }
  }
}

/**
 * Returns true when the action is allowed and records it; returns false when
 * the caller has exceeded `limit` actions within `windowMs`.
 */
export const checkRateLimit = (key: string, limit: number, windowMs: number): boolean => {
  const now = Date.now()
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs)

  if (recent.length >= limit) {
    buckets.set(key, recent)
    return false
  }

  recent.push(now)
  buckets.set(key, recent)
  pruneIfLarge()
  return true
}
