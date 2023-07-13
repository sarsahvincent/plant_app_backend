
/* Not Found */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.original}`);
  res.status(404);
  next(error);
};

/* Error Handler */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode == 200 ? 500 : err.statusCode;
  // req.status(statusCode);
  req.json({
    message: err.message,
    stack: err.stack,
  });
};
