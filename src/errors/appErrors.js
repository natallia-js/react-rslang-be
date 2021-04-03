// eslint-disable-next-line max-classes-per-file
const {
  BAD_REQUEST,
  EXPECTATION_FAILED,
  FORBIDDEN,
  NOT_FOUND,
  UNAUTHORIZED,
  getStatusText,
} = require('http-status-codes');

class AppError extends Error {
  // eslint-disable-next-line no-useless-constructor
  constructor(message) {
    super(message);
  }
}

class AuthenticationError extends AppError {
  constructor(message) {
    super(message || getStatusText(FORBIDDEN));
    this.status = FORBIDDEN;
  }
}

class AuthorizationError extends AppError {
  constructor(message) {
    super(message || getStatusText(UNAUTHORIZED));
    this.status = UNAUTHORIZED;
  }
}

class BadRequestError extends AppError {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST;
  }
}

class EntityExistsError extends AppError {
  constructor(message) {
    super(message);
    this.status = EXPECTATION_FAILED;
  }
}

class NotFoundError extends AppError {
  constructor(entity, params, message) {
    super(message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`);
    this.status = NOT_FOUND;
  }
}

class NotFoundPhotoError extends AppError {
  constructor(entity, message) {
    super(message || `Couldn't find ${entity}' photo`);
    this.status = NOT_FOUND;
  }
}

module.exports = {
  AUTHENTICATION_ERROR: AuthenticationError,
  AUTHORIZATION_ERROR: AuthorizationError,
  BAD_REQUEST_ERROR: BadRequestError,
  ENTITY_EXISTS: EntityExistsError,
  NOT_FOUND_ERROR: NotFoundError,
  NOT_FOUND_PHOTO_ERROR: NotFoundPhotoError,
};
