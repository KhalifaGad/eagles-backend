import boom from "@hapi/boom";
import { MongoServices as dbServices } from "../infra/db/Mongo";

class ErrorService {
  isDatabaseError(error) {
    return dbServices.ErrorService.isDatabaseError(error);
  }

  isInternalError(error) {
    return dbServices.ErrorService.isInternalError(error);
  }

  getDatabaseErrorMessage(error) {
    return dbServices.ErrorService.getErrorMessage(error);
  }

  getErrorMessage(error) {
    if (this.isDatabaseError(error)) return this.getDatabaseErrorMessage(error);
    console.log(error);
    return "APPLICATION ERROR";
  }

  handleError(error) {
    if (this.isInternalError(error))
      return boom.internal("Something went wrong!", error);
    return boom.badData(this.getErrorMessage(error));
  }
}

export default new ErrorService();
