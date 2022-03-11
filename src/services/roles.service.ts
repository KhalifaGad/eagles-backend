import { rolesRepository } from "../mongo/repositories";
import { RoleInterface } from "../types";

export const createRole = async (role: RoleInterface): Promise<RoleInterface> =>
  rolesRepository.create(role);

export const listRoles = async (): Promise<RoleInterface[]> =>
  rolesRepository.list();
