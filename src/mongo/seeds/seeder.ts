import data from "./data";
import * as repositories from "../repositories";

export default async () => {
  await Promise.all([
    repositories.rolesRepository.insertMany(
      data.roles.map((name) => ({ name }))
    ),
    repositories.citiesRepository.insertMany(
      data.cities.map((name) => ({ name }))
    ),
    repositories.vehiclesRepository.insertMany(
      data.vehicles.map((plateNumber) => ({ plateNumber }))
    ),
  ]);
};
