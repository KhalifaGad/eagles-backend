import { MongooseRepos as Repos } from "./repositories";
import * as entities from "../../../domain/entities";
import * as seedData from "../seedData";
import * as hashing from "../../hashing";

async function seed() {
  const citiesCount = await Repos.City.count();
  if (!citiesCount) {
    await seedCities();
  }

  const emplyeeRoleCount = await Repos.EmployeeRole.count();
  if (!emplyeeRoleCount) {
    seedEmployeeRoles();
  }

  const branchesCount = await Repos.Branch.count();
  if (!branchesCount && process.env.NODE_ENV !== "production") {
    await seedBranches();
  }
}

async function seedCities() {
  const cities = seedData.cities.map((cityName) => {
    const city = new entities.CityEntity();
    city.name = cityName;
    return city;
  });

  Repos.City.insertMany(cities);
}

async function seedEmployeeRoles() {}

async function seedBranches() {
  const cities = await Repos.City.list();
  const addressesCount = await Repos.Address.count({
    occupantType: entities.OCCUPANT_TYPES.branch,
  });

  const addresses = !addressesCount
    ? await createAddresses(cities, entities.OCCUPANT_TYPES.branch)
    : await Repos.Address.listUnleaned({
        occupantType: entities.OCCUPANT_TYPES.branch,
        occupantId: undefined,
      });

  const ownersCount = await Repos.BranchOwner.count();
  const owners = !ownersCount
    ? await createOwners(cities)
    : await Repos.BranchOwner.listUnleaned({ branches: [] });

  let branches = [];
  for (let i = 0; i < owners.length; i++) {
    const branch = new entities.BranchEntity();
    branch.address = addresses[i]._id;
    branch.commercialNumber = `10000234${i}`;
    branch.name = `فرع ${addresses[i].name}`;
    branch.taxCardNumber = `20000345${i}`;
    branch.telephone = `437039${i}`;
    branch.ownerId = owners[i]._id;
    branches.push(branch);
  }
  branches = await Repos.Branch.insertMany(branches);

  const addressesMap = createIdDocumentMap(addresses);
  const ownersMap = createIdDocumentMap(owners);

  for (let branch of branches) {
    const address = addressesMap.get(branch.address);
    address.occupantId = branch._id;
    address.save();
    const owner = ownersMap.get(branch.ownerId);
    owner.branches.push(branch._id);
    owner.save();
    fillBranchWithEmpolyees(branch, address.cityId);
  }
}

async function fillBranchWithEmpolyees(branch, cityId) {}

async function createOwners(cities) {
  const ownersAddressesCount = await Repos.Address.count({
    occupantType: entities.OCCUPANT_TYPES.owner,
  });

  const addresses = !ownersAddressesCount
    ? await createAddresses(cities, entities.OCCUPANT_TYPES.owner)
    : await Repos.Address.listUnleaned({
        occupantType: entities.OCCUPANT_TYPES.owner,
        occupantId: undefined,
      });

  let owners = [];
  for (let i = 0; i < addresses.length; i++) {
    const owner = new entities.BranchOwnerEntity();
    owner.address = addresses[i]._id;
    owner.idNumber = `290192810000234${i}`;
    owner.name = `test owner ${i}`;
    owner.mobile = `0109910629${i}`;
    owner.password = await hashing.createHash("password");
    owners.push(owner);
  }
  return Repos.BranchOwner.insertMany(owners);
}

function createAddresses(cities, occupantType, cityId = undefined) {
  let addresses = [];
  for (let i = 0; i < cities.length; i++) {
    const address = new entities.AddressEntity();
    address.occupantType = occupantType;
    address.cityId = cityId ? cityId : cities[i]._id;
    address.area = `area ${i}`;
    address.block = `block ${i}`;
    address.street = `street ${i}`;
    address.landmark = `landmark ${i}`;
    addresses.push(address);
  }
  return Repos.Address.insertMany(addresses);
}

function createIdDocumentMap(documents) {
  const idDocumentMap = new Map();
  for (let document of documents) {
    idDocumentMap.set(document._id, document);
  }
  return idDocumentMap;
}

export { seed };
