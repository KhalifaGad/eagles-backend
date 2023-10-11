import { RideTemplateInterface } from "$types";
import { RideTemplateModel } from "../models/index.js";
import DefaultRepository from "./default.repository.js";

class RideTemplateRepository extends DefaultRepository<RideTemplateInterface> {
  constructor() {
    super(RideTemplateModel, {
      path: "steps",
      populate: { path: "stepLocationEntity" },
    });
  }
}

export default new RideTemplateRepository();
