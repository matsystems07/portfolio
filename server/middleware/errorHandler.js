// server/middleware/errorHandler.js

function errorHandler(err, req, res, next) {
  const status = err?.status || 500;
  const isProd = process.env.NODE_ENV === 'production';

  console.error("🔥 Unhandled error:", err);

  const payload = {
    ok: false,
    status,
    message: isProd
      ? (status === 500 ? 'Internal server error' : err.message)
      : (err.message || 'Internal server error'),
  };

  if (!isProd && err?.stack) {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}

module.exports = errorHandler;
