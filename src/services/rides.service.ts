import { ridesRepository } from "../mongoDB/repositories";
import { RideInterface } from "../types";

export const createRide = async (ride: RideInterface): Promise<RideInterface> => ridesRepository.create(ride);

export const listRides = async (): Promise<RideInterface[]> => ridesRepository.list();
