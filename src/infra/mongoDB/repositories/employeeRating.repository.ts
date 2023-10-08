import DefaultRepository from "./default.repository.js";
import { EmployeeRatingModel } from "../models/index.js";
import { EmployeeRatingInterface } from "$types";

class EmployeeRatingRepository extends DefaultRepository<EmployeeRatingInterface> {
  constructor() {
    super(EmployeeRatingModel, [
      { path: "employee", populate: { path: "address.city" } },
      { path: "agency", populate: { path: "address.city" } },
    ]);
  }
}

export default new EmployeeRatingRepository();
