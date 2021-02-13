const colors = require("colors");
const ErrorResponse = require("../utils/ErrorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(`${err}`.red);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Meme not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //Duplicate Payload Error
  if (err.name === "MongoError") {
    const message = "Duplicate request with same payload";
    error = new ErrorResponse(message, 409);
  }
  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Server Error",
    statusCode: error.statusCode,
  });
};

module.exports = errorHandler;
