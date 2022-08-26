const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  BAD_REQUEST_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE, NotFoundError,
};
