import { cityRepository } from "../mongo/repositories";
import { CityEntity } from "../types";

export const listCities = async (): Promise<CityEntity[]> =>
  cityRepository.list();
