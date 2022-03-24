import {
  notFound,
  unauthorized,
  forbidden,
  badData,
  badRequest,
} from "@hapi/boom";

class Errors {
  throwNotFound(message?: string) {
    throw notFound(message);
  }

  throwUnauthorized(message?: string) {
    throw unauthorized(message);
  }

  throwForbidden(message?: string) {
    throw forbidden(message);
  }

  throwBadData(message?: string) {
    throw badData(message);
  }

  throwBadRequest(message?: string) {
    throw badRequest(message);
  }
}

export default new Errors();
