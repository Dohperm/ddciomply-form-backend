const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  if (err.name === "CastError") {
    return res.status(404).json({ status: false, msg: `No object with id: ${err.value._id} found` });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ status: false, msg: "File too large" });
  }

  res.status(statusCode).json({ status: false, msg: message });
};

module.exports = errorHandlerMiddleware;
