import { userRepository } from "../mongo/repositories";
import { AddressInterface, UserInterface } from "../types";

export const createuser = async (
  user: UserInterface,
  addresses: AddressInterface[],
  branchId: number
): Promise<UserInterface> =>
  userRepository.create({
    ...user,
    branchId,
    addresses,
  });

export const listusers = async (): Promise<UserInterface[]> =>
  userRepository.list();
