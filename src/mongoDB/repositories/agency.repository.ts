import DefaultRepository from "./default.repository";
import { AgencyModel } from "../models";
import { AgencyInterface } from "../../types";

class AgencyRepository extends DefaultRepository<AgencyInterface> {
  constructor() {
    super(AgencyModel, { path: "address.city" });
  }
}

export default new AgencyRepository();
