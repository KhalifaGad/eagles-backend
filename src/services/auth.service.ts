import jwt from "jsonwebtoken";
import exceptions from "../errors";
import { branchesRepository, usersRepository } from "../mongo/repositories";
import { UserInterface, BranchInterface } from "../types";
import { verifyHash } from "../utilities";
import config from "../../config";

export const login = async (
  mobile: string,
  secret: string
): Promise<
  void | (UserInterface & { branch: BranchInterface; token: string })
> => {
  const { password = "", ...user } =
    (await usersRepository.findOne({ mobile })) || {};

  if (!user?.loginPermission || !(await verifyHash(secret, password))) {
    return exceptions.throwUnauthorized("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: config.jwtLifeTime,
  });

  const branch = await branchesRepository.findById(user.branchId);

  return { ...user, branch, token };
};
