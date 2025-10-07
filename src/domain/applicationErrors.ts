export const ERROR_CODES = {
  EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
  UNAUTHORIZED_ERROR: "UNAUTHORIZED_ERROR",
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
