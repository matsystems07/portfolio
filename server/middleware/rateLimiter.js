// server/middleware/rateLimiter.js
/**
 * Simple IP-based rate limiter middleware (in-memory).
 *
 * Usage:
 * app.use(rateLimiter({ windowMs: 60_000, max: 60 }));
 *
 * Notes:
 * - In-memory: not suitable for multi-instance production. Use Redis for cluster.
 * - Stores counters in a Map and periodically cleans up stale entries.
 */

const DEFAULTS = { windowMs: 60_000, max: 60, cleanupIntervalMs: 60_000 };

function rateLimiter(opts = {}) {
  const { windowMs, max, cleanupIntervalMs } = { ...DEFAULTS, ...opts };
  const store = new Map(); // ip -> [timestamps]

  // periodic cleanup to avoid memory leaks
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of store.entries()) {
      const pruned = timestamps.filter((t) => now - t <= windowMs);
      if (pruned.length === 0) store.delete(ip);
      else store.set(ip, pruned);
    }
  }, cleanupIntervalMs);

  // allow stopping the timer if needed
  cleanupTimer.unref?.();

  return function (req, res, next) {
    try {
      const ip = (req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown').toString();
      const now = Date.now();
      const timestamps = store.get(ip) || [];

      // keep only recent timestamps within window
      const recent = timestamps.filter((t) => now - t <= windowMs);

      if (recent.length >= max) {
        // Too many requests
        res.setHeader('Retry-After', Math.ceil(windowMs / 1000));
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
      }

      // record this request
      recent.push(now);
      store.set(ip, recent);

      next();
    } catch (err) {
      // in case of unexpected error, allow request but log it
      console.error('Rate limiter error:', err);
      next();
    }
  };
}

module.exports = rateLimiter;
