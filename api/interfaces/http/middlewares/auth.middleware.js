import boom from "@hapi/boom";

function withBranchId(req, _res, next) {
  const branchId = req.signedCookies.branchId;
  if (!branchId) return next(boom.unauthorized("Unauthorized!"));
  req.locals = {
    ...req.locals,
    branchId,
  };
  next();
}

export { withBranchId };
