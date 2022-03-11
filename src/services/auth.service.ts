import exceptions from "../errors";
import { branchesRepository, usersRepository } from "../mongo/repositories";
import { UserInterface, BranchInterface } from "../types";
import { verifyHash } from "../utilities";

export const login = async (
  mobile: string,
  password: string
): Promise<void | (UserInterface & { branch: BranchInterface })> => {
  const user = await usersRepository.findOne({ mobile });

  if (!user?.loginPermission || !(await verifyHash(user.password, password))) {
    return exceptions.throwUnauthorized("Invalid credentials");
  }

  const branch = await branchesRepository.findById(user.branchId);

  return { ...user, branch };
};
