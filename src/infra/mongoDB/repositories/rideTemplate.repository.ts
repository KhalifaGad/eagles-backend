import DefaultRepository from "./default.repository.js";
import { RideTemplateModel } from "../models/index.js";
import { RideTemplateInterface } from "$types";

class RideTemplateRepository extends DefaultRepository<RideTemplateInterface> {
  constructor() {
    super(RideTemplateModel);
  }
}

export default new RideTemplateRepository();
