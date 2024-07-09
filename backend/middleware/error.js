// Handling Route not found Error.
const notFound = (req, res, next) => {
  const error = new Error(`Not Fount - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// default error handler by express.
const errorHandler = (error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let { message } = error || "Something went wrong. Please try again letter";

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  });
};

export { notFound, errorHandler };
