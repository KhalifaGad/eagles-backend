import { AccountEnum, ID } from "$types";
import { createHash } from "$utils";
import * as repositories from "../repositories/index.js";
import { citiesData, hubsData } from "./data/index.js";

const { ADMIN_NAME, ADMIN_PHONE, ADMIN_EMAIL, ADMIN_PASS } = process.env;

export default async () => {
  if (!ADMIN_NAME || !ADMIN_PHONE || !ADMIN_EMAIL || !ADMIN_PASS) throw new Error("Admin data is missing");

  // ***********  Cities *********** //
  await Promise.all(citiesData.map(cityData => repositories.cityRepository.upsert(cityData, "englishName")));

  // ***********  Hubs *********** //
  await Promise.all(
    hubsData.map(async ({ name, cityEnglishName, address, isHotspot }) => {
      const city = await repositories.cityRepository.findOne({ englishName: cityEnglishName });

      if (!city) throw new Error("City not found");

      return repositories.hubRepository.upsert(
        { name, isHotspot, address: { ...address, city: city._id as ID } },
        "name"
      );
    })
  );

  // ***********  Employee *********** //
  const account = await repositories.employeeRepository.upsert(
    {
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
      canJoinRides: false,
    },
    "mobile"
  );

  await repositories.credentialRepository.upsert(
    {
      mobile: ADMIN_PHONE,
      accountType: AccountEnum.Employee,
      password: await createHash(ADMIN_PASS),
      account: account._id,
    },
    "mobile"
  );
};
