import boom from "@hapi/Boom";

export const notFound = (message?: string) => boom.notFound(message);

export const unauthorized = (message?: string) => boom.unauthorized(message);

export const forbidden = (message?: string) => boom.forbidden(message);

export const badData = (message?: string) => boom.badData(message);

export const badRequest = (message?: string) => boom.badRequest(message);
