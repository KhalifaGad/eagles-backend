import DefaultRepository from "./default.repository";
import { EmployeeRatingModel } from "../models";
import { EmployeeRatingInterface } from "../../types";

class EmployeeRatingRepository extends DefaultRepository<EmployeeRatingInterface> {
  constructor() {
    super(EmployeeRatingModel, [
      { path: "employee", populate: { path: "address.city" } },
      { path: "agency", populate: { path: "address.city" } },
    ]);
  }
}

export default new EmployeeRatingRepository();
