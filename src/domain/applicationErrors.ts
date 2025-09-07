export const ERROR_CODES = {
  EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
  UNAUTHORIZED_ERROR: "UNAUTHORIZED_ERROR",
  INVALID_USER_ERROR: "INVALID_USER_ERROR",
  INVALID_PERSON_ERROR: "INVALID_PERSON_ERROR",
  INVALID_VIDEO_ERROR: "INVALID_VIDEO_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
};

export class BaseError extends Error {
  public readonly code: string;

  constructor(message: string) {
    super(message);
    this.code = "BASE_ERROR";
  }
}

export class ExternalServiceError extends BaseError {
  public readonly code = "EXTERNAL_SERVICE_ERROR";

  constructor({ message }: { message: string }) {
    super(message);
  }
}

export class DatabaseError extends BaseError {
  public readonly code = "DATABASE_ERROR";

  constructor({ message }: { message: string }) {
    super(message);
  }
}

export class InvalidUserError extends BaseError {
  public readonly code = "INVALID_USER_ERROR";

  constructor({ message }: { message: string }) {
    super(message);
  }
}

export class InvalidPersonError extends BaseError {
  public readonly code = "INVALID_PERSON_ERROR";

  constructor({ message }: { message: string }) {
    super(message);
  }
}

export class InvalidVideoError extends BaseError {
  public readonly code = "INVALID_VIDEO_ERROR";

  constructor({ message }: { message: string }) {
    super(message);
  }
}
