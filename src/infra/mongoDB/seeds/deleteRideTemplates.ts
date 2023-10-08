import * as repositories from "../repositories/index.js";

const { ADMIN_NAME, ADMIN_PHONE, ADMIN_EMAIL, ADMIN_PASS } = process.env;

export default async () => {
  if (!ADMIN_NAME || !ADMIN_PHONE || !ADMIN_EMAIL || !ADMIN_PASS) throw new Error("Admin data is missing");
  
  // ***********  Cities *********** //
  await repositories.rideTemplateRepository.deleteBy({});
};
