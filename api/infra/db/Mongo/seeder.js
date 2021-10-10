import { MongooseRepos as Repos } from "./repositories";
import * as entities from "../../../domain/entities";
import * as seedData from "../seedData";
import * as hashing from "../../hashing";

async function seed() {
  // await drop();
  const citiesCount = await Repos.City.count();
  if (!citiesCount) {
    console.log("Seeding cities...");
    await seedCities();
  }

  const emplyeeRoleCount = await Repos.EmployeeRole.count();
  if (!emplyeeRoleCount) {
    console.log("Seeding employees roles...");
    seedEmployeeRoles();
  }

  const branchesCount = await Repos.Branch.count();
  if (!branchesCount && process.env.NODE_ENV !== "production") {
    console.log("Seeding branches...");
    await seedBranches();
  }
}

async function drop() {
  await Repos.Employee.drop();
  await Repos.Branch.drop();
  await Repos.BranchOwner.drop();
  await Repos.Address.drop();
}

async function seedCities() {
  const cities = seedData.cities.map((cityName) => {
    const city = new entities.CityEntity();
    city.name = cityName;
    return city;
  });

  await Repos.City.insertMany(cities);
}

async function seedEmployeeRoles() {
  const employeeRoles = seedData.employeeRoles.map(
    (role) => new entities.EmployeeRoleEntity({ name: role })
  );
  await Repos.EmployeeRole.insertMany(employeeRoles);
}

async function seedBranches() {
  const cities = await Repos.City.list();

  const { addresses, citiesMap } = await createAddresses(
    cities,
    entities.OCCUPANT_TYPES.branch,
    undefined,
    true
  );

  const owners = await createOwners(cities);

  let branches = [];
  for (let i = 0; i < owners.length; i++) {
    const branch = new entities.BranchEntity();
    const address = addresses[i];
    const cityName = citiesMap.get(address.cityId).name;
    branch.address = address._id;
    branch.commercialNumber = `10000234${i}`;
    branch.name = `فرع ${cityName}`;
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
    const branchEmployees = await fillBranchWithEmpolyees(
      branch,
      address.cityId
    );
    branch.employees = branchEmployees.map((emp) => emp._id);
    await branch.save();
  }
}

async function fillBranchWithEmpolyees(branch, cityId) {
  const employeesRoles = await Repos.EmployeeRole.list();
  const tempArr = new Array(employeesRoles.length);
  const addresses = await createAddresses(
    tempArr,
    entities.OCCUPANT_TYPES.employee,
    cityId
  );
  const password = await hashing.createHash("abcd1234");
  const employees = [];
  for (let [i, employeeRole] of employeesRoles.entries()) {
    const role = new entities.EmployeeRoleEntity(employeeRole);
    const addressId = addresses[i]._id;
    const employee = new entities.EmployeeEntity({
      name: `تست ${role.name}`,
      mobile: `010${branch.telephone}${i}`,
      addressId,
      employeeRoleId: role._id,
      branchId: branch._id,
      idNumber: `209991${branch.telephone}${i}`,
      loginPermission: true,
      password,
    });
    employees.push(employee);
  }
  return Repos.Employee.insertMany(employees);
}

async function createOwners(cities) {
  const ownersAddressesCount = await Repos.Address.count({
    occupantType: entities.OCCUPANT_TYPES.owner,
  });

  const addresses = !ownersAddressesCount
    ? await createAddresses(cities, entities.OCCUPANT_TYPES.owner)
    : await Repos.Address.Rawlist({
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

async function createAddresses(
  cities,
  occupantType,
  cityId = undefined,
  returnCitiesMap = undefined
) {
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
  if (returnCitiesMap) {
    addresses = await Repos.Address.insertMany(addresses);
    return {
      addresses,
      citiesMap: createIdDocumentMap(cities),
    };
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
