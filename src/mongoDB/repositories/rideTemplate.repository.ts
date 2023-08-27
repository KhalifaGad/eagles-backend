import DefaultRepository from "./default.repository";
import { RideTemplateModel } from "../models";
import { RideTemplateInterface } from "../../types";

class RideTemplateRepository extends DefaultRepository<RideTemplateInterface> {
  constructor() {
    super(RideTemplateModel);
  }
}

export default new RideTemplateRepository();
