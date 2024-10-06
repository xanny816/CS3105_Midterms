const loggingMiddleware = (req, res, next) => {
   //Log HTTP method, URL requested, and current timestamp in ISO format
  console.log(`${req.method} request to ${req.url} at ${new Date().toISOString()}`);
  next();
};

module.exports = loggingMiddleware;