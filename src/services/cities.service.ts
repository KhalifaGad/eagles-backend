import { citiesRepository } from "../mongoDB/repositories";
import { CityInterface } from "../types";

export const createCity = async (city: CityInterface): Promise<CityInterface> => citiesRepository.create(city);

export const listCities = async (): Promise<CityInterface[]> => citiesRepository.list();
