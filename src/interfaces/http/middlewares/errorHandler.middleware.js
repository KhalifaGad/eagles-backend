function errorHandler(err, req, res, _) {
  return res.status(400).send(err);
}

export { errorHandler };
