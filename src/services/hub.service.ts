import { hubRepository } from "$infra";
import { HubInterface } from "$types";
import DefaultService from "./default.service.js";

class HubService extends DefaultService<HubInterface> {
  constructor() {
    super(hubRepository);
  }
}

export default new HubService();
