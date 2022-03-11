import { vehiclesRepository } from "../mongo/repositories";
import { VehicleInterface } from "../types";

export const createVehicle = async (
  vehicle: VehicleInterface
): Promise<VehicleInterface> => vehiclesRepository.create(vehicle);

export const listVehicles = async (): Promise<VehicleInterface[]> =>
  vehiclesRepository.list();
