import { hubRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { HubInterface } from "../types";

class HubService extends DefaultService<HubInterface> {
  constructor() {
    super(hubRepository);
  }
}

export default new HubService();
