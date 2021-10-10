import boom from "@hapi/boom";

function errorHandler(err, _req, res, _next) {
  if (boom.isBoom(err)) {
    if (err.output.statusCode >= 500) {
      console.log(err);
      return res.status(err.output.statusCode).send({
        error: "Something went wrong! please try again later",
      });
    }
    return res.status(err.output.statusCode).send({
      error: err.output.payload.message,
    });
  }
  return res.status(400).send(err);
}

export { errorHandler };
