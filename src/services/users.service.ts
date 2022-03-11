import { usersRepository } from "../mongo/repositories";
import { UserInterface } from "../types";

export const createUser = async (user: UserInterface): Promise<UserInterface> =>
  usersRepository.create(user);

export const listUsers = async (): Promise<UserInterface[]> =>
  usersRepository.list();
