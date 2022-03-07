import { clientRepository } from "../mongo/repositories";
import { AddressEntity, ClientEntity } from "../types";

export const createClient = async (
  client: ClientEntity,
  addresses: AddressEntity[],
  branchId: number
): Promise<ClientEntity> =>
  clientRepository.create({
    ...client,
    branchId,
    addresses,
  });

export const listClients = async (): Promise<ClientEntity[]> =>
  clientRepository.list();
