import { AccountEnum, MongooseID } from "../../types";
import { createHash } from "../../utilities";
import * as repositories from "../repositories";
import { citiesData, hubsData } from "./data";

const { ADMIN_NAME, ADMIN_PHONE, ADMIN_EMAIL, ADMIN_PASS } = process.env;

if (!ADMIN_NAME || !ADMIN_PHONE || !ADMIN_EMAIL || !ADMIN_PASS) throw new Error("Admin data is missing");

export default async () => {
  // ***********  Cities *********** //
  await Promise.all(citiesData.map(cityData => repositories.cityRepository.upsert(cityData, "englishName")));

  // ***********  Hubs *********** //
  await Promise.all(
    hubsData.map(async ({ name, cityEnglishName, address }) => {
      const city = await repositories.cityRepository.findOne({ englishName: cityEnglishName });

      return repositories.hubRepository.upsert({ name, address: { ...address, city: city._id as MongooseID } }, "name");
    })
  );

  // ***********  Employee *********** //
  const account = await repositories.employeeRepository.upsert({
    name: ADMIN_NAME,
    mobile: ADMIN_PHONE,
    email: ADMIN_EMAIL,
    position: "Super Admin",
    nationalId: "00000000000000",
    qualification: "Dummy",
    socialStatus: "Dummy",
    isAdmin: true,
    salary: 0,
    isAgencyAdmin: false,
    isCustomerService: false,
  }, "mobile")
  
  await repositories.credentialRepository.upsert({
    mobile: ADMIN_PHONE,
    accountType: AccountEnum.Employee,
    password: await createHash(ADMIN_PASS),
    account,
  }, "mobile");
};
