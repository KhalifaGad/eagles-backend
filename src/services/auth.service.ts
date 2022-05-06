import jwt from "jsonwebtoken";
import exceptions from "../errors";
import { branchesRepository, usersRepository } from "../mongoDB/repositories";
import { UserInterface, BranchInterface } from "../types";
import { verifyHash } from "../utilities";
import config from "../../config";

export const login = async (
  mobile: string,
  password: string
): Promise<void | (UserInterface & { branch: BranchInterface; token: string })> => {
  const user = await usersRepository.findOne({ mobile });

  if (!user?.loginPermission || !(await verifyHash(user.password, password))) {
    return exceptions.throwUnauthorized("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: config.jwtLifeTime,
  });

  const branch = await branchesRepository.findById(user.branchId);

  return { ...user, branch, token };
};
