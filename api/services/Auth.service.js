import { MongooseRepos } from "../infra/db/Mongo/repositories";
import { EmployeeEntity } from "../domain/entities";
import { verifyHash } from "../infra/hashing";
import boom from "@hapi/boom";

const INVALID_CREDENTIALS = "Invalid credentials";

class AuthService {
  async login(mobile, password, res) {
    const employeeData = await MongooseRepos.Employee.findOneBy({ mobile });
    if (!employeeData) return boom.unauthorized(INVALID_CREDENTIALS);

    const employee = new EmployeeEntity(employeeData);
    const isValidPass = await verifyHash(employee.password, password);

    if (!isValidPass) return boom.unauthorized(INVALID_CREDENTIALS);
    if (!employee.loginPermission)
      return boom.unauthorized(INVALID_CREDENTIALS);

    const employeeBranch = await MongooseRepos.Branch.findById(
      employee.branchId
    );
    delete employee.password;
    delete employeeBranch.taxCardNumber;
    delete employeeBranch.commercialNumber;
    console.log(
      employee._id,
      `${employee._id}`,
      String(employee._id),
      JSON.stringify(employee._id),
      employee._id + ""
    );
    this.setResCookies(res, {
      _id: String(employee._id),
      branchId: String(employee.branchId),
    });
    return {
      employee,
      branch: employeeBranch,
    };
  }

  setResCookies(res, cookies) {
    const cookiesOptions = {
      signed: true,
      httpOnly: true,
    };

    for (const cookie in cookies) {
      res.cookie(cookie, cookies[cookie], cookiesOptions);
    }
  }
}

export default new AuthService();
