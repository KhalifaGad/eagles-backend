import exceptions from "../errors";
import { branchRepository, employeeRepository } from "../mongo/repositories";
import { EmployeeInterface, BranchInterface } from "../types";
import { verifyHash } from "../utilities";

export const login = async (
  mobile: string,
  password: string
): Promise<void | (EmployeeInterface & { branch: BranchInterface | null })> => {
  const employee = await employeeRepository.findOne({ mobile });

  if (
    !employee ||
    !employee.loginPermission ||
    !(await verifyHash(employee.password, password))
  ) {
    return exceptions.throwUnauthorized("Invalid credentials");
  }

  const branch = await branchRepository.findById(employee.branchId);

  return { ...employee, branch };
};
