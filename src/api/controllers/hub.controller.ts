import { hubService } from "$services";
import { HubInterface } from "$types";
import DefaultController from "./default.controller.js";

class HubController extends DefaultController<HubInterface> {
  constructor() {
    super(hubService);
  }
}

export default new HubController();
