import { ClientEntity, AddressEntity, OCCUPANT_TYPES } from "../entities";
import { MongooseRepos as repos } from "../../infra/db/Mongo/repositories";

async function addClient(clientData, addressData) {
  let client = new ClientEntity(clientData);
  let address = new AddressEntity({
    ...addressData,
    occupantType: OCCUPANT_TYPES.client,
  });

  address = await repos.Address.create(address, false);
  client.addresses = [address._id];
  client = await repos.Client.create(client);
  address.occupantId = client._id;
  await address.save();
  client.addresses = [address];
  return client;
}

export { addClient };
