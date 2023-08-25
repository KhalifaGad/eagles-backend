import boom from "@hapi/boom";

export const notFound = (message = "لا يوجد شيء") => boom.notFound(message);

export const unauthorized = (message = "غير مصرح") => boom.unauthorized(message);

export const forbidden = (message = "مُحرَّم") => boom.forbidden(message);

export const badData = (message = "بيانات سيئة") => boom.badData(message);

export const badRequest = (message = "اقتراح غير جيد") => boom.badRequest(message);
