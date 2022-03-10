import { cityRepository } from "../mongo/repositories";
import { CityInterface } from "../types";

export const listCities = async (): Promise<CityInterface[]> =>
  cityRepository.list();
