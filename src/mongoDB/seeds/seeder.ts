import { citiesData, hubsData } from "./data";
import * as repositories from "../repositories";
import { createHash } from "../../utilities";
import { MongooseID, AccountEnum } from "../../types";

export default async () => {
  // ***********  Cities *********** //
  await repositories.cityRepository.insertMany(citiesData);

  // ***********  Hubs *********** //
  await repositories.hubRepository.insertMany(
    await Promise.all(
      hubsData.map(async ({ name, cityEnglishName, address }) => {
        const city = await repositories.cityRepository.findOne({ englishName: cityEnglishName });

        return { name, address: { ...address, city: city._id as MongooseID } };
      })
    )
  );

  // ***********  Employee *********** //
  await repositories.credentialRepository.create({
    mobile: "+201114057736",
    accountType: AccountEnum.Employee,
    password: await createHash("Password123"),
    account: await repositories.employeeRepository.create({
      name: "Sahragty",
      mobile: "+201114057736",
      email: "omar_elsahragty@hotmail.com",
      birthdate: new Date("1997-02-13"),
      position: "Alexandria",
      nationalId: "00000000000000",
      qualification: "Dummy",
      socialStatus: "Dummy",
      address: {
        city: (await repositories.cityRepository.findOne({ englishName: "Alexandria" }))._id as MongooseID,
        area: "Smouha",
        street: "Dummy",
      },
      salary: 86924,
    }),
  });
};
