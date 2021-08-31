// Route not found function to handle sending
// a not found error message
export function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// Error handler middleware
// Wraps the request with an envelope which includes the statusCode,
// a message, if in not production the stack trace otherwise an emoji
/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}