import { citiesData, hubsData } from "./data";
import * as repositories from "../repositories";
import { MongooseID } from "../../types";

export default async () => {
  await repositories.cityRepository.insertMany(citiesData);

  await repositories.hubRepository.insertMany(
    await Promise.all(
      hubsData.map(async ({ name, cityEnglishName, address }) => {
        const city = await repositories.cityRepository.findOne({ englishName: cityEnglishName });

        return { name, address: { ...address, city: city._id as MongooseID } };
      })
    )
  );
};
