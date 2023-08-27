import DefaultRepository from "./default.repository";
import { RideTemplateModel } from "../models";
import { RideTemplateInterface } from "../../types";

class RideTemplateRepository extends DefaultRepository<RideTemplateInterface> {
  constructor() {
    super(RideTemplateModel, [{ path: "stepLocationEntity", populate: { path: "address.city" } }]);
  }
}

export default new RideTemplateRepository();
