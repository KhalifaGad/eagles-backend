import { vehiclesRepository } from "../mongoDB/repositories";
import { VehicleInterface } from "../types";

export const createVehicle = async (vehicle: VehicleInterface): Promise<VehicleInterface> =>
  vehiclesRepository.create(vehicle);

export const listVehicles = async (): Promise<VehicleInterface[]> => vehiclesRepository.list();
