module.exports = (message, statusCode) => {
  const error = new Error(message);
  error.message = message;
  error.statusCode = statusCode;
  return error;
};
