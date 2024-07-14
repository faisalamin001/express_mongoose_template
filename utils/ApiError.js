class ApiError extends Error {
  constructor(status, message) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = status;
    this.success = false;
    this.message = message;

    Error.captureStackTrace(this);
  }
}

module.exports = ApiError;
