import { shipmentRepository } from "~infra/index.js";
import { getUniqueCode } from "~utilities/index.js";

class CodeGenerator {
  async generate() {
    let code = "";
    let isExist = true;
    do {
      code = getUniqueCode();
      const existingCount = await shipmentRepository.count({ code });
      isExist = existingCount > 1;
    } while (isExist);
    return code;
  }
}

export default new CodeGenerator();
