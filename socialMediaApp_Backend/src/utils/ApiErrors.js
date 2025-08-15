class ApiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong- - coming from ApiError.js file",
    errors = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}

export { ApiError };
