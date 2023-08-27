import * as repositories from "../repositories";

const { ADMIN_NAME, ADMIN_PHONE, ADMIN_EMAIL, ADMIN_PASS } = process.env;

if (!ADMIN_NAME || !ADMIN_PHONE || !ADMIN_EMAIL || !ADMIN_PASS) throw new Error("Admin data is missing");

export default async () => {
  // ***********  Cities *********** //
  await repositories.rideTemplateRepository.deleteBy({});
};
