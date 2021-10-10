import { MongoError } from "mongodb";
import mongoose from "mongoose";

class MongoErrorService {
  isInternalError(error) {
    return error instanceof MongoError && error.code !== 11000;
  }

  isValidationError(error) {
    return error instanceof mongoose.Error.ValidationError;
  }

  isUniqueIndexError(error) {
    return error.code === 11000;
  }

  isDatabaseError(error) {
    return (
      this.isInternalError(error) ||
      this.isValidationError(error) ||
      this.isUniqueIndexError(error)
    );
  }

  getErrorMessage(error) {
    if (this.isValidationError(error))
      return Object.keys(error.errors)
        .map((errorKey) => error.errors[errorKey].message)
        .join(" & ");

    if (this.isUniqueIndexError(error))
      return Object.keys(error.keyValue)
        .map((errKey) => `${errKey} is already taken`)
        .join(" & ");
    return "bla bla";
  }
}

export default new MongoErrorService();
