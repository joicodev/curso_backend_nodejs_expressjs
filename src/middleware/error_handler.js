function logErrors (err, req, res, next) {
  console.log("LogsErrores");
  next(err);
}

function boomErrorHandler (err, req, res, next) {
  if(err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }

 next(err);
}

function errorHandler (err, req, res, next) {
  console.log("errorHandler");
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}



module.exports = { logErrors, boomErrorHandler, errorHandler };

