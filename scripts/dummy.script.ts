import { establishConnection, repositories, seeder } from "../src/mongo";
import { AddressInterface } from "../src/types";

const randomString = (): string =>
  (Math.random() + 1).toString(36).substring(7);

const randomAddress = (cityId: string): AddressInterface => ({
  apartmentNumber: Math.random(),
  floorNumber: Math.random(),
  landmark: randomString(),
  street: randomString(),
  block: randomString(),
  area: randomString(),
  lat: Math.random(),
  lng: Math.random(),
  cityId,
});

const run = async () => {
  await establishConnection();
  await seeder();

  const [city, organization] = await Promise.all([
    repositories.citiesRepository.findOne({
      name: "الاسكندريه",
    }),
    repositories.organizationsRepository.create({
      name: "50 Eagles",
      taxCardNumber: "0",
      commercialNumber: "0",
      businessType: "company",
      owner: { name: "Khalifa", mobile: "+200000000000" },
    }),
  ]);

  const branch = await repositories.branchesRepository.create({
    address: randomAddress(city?._id?.toString() as string),
    organizationId: organization._id?.toString() as string,
    mangers: [{ name: "sahragty", mobile: "+200000000001", department: "dev" }],
    telephone: "+200000000",
  });

  const [products, user] = await Promise.all([
    repositories.productsRepository.insertMany([
      {
        name: { arabic: randomString(), english: randomString() },
        description: { arabic: randomString(), english: randomString() },
        branchId: branch?._id?.toString() as string,
        organizationId: organization?._id?.toString() as string,
        height: Math.random(),
        price: Math.random(),
        weight: Math.random(),
        width: Math.random(),
      },
    ]),
    repositories.usersRepository.create({
      firstName: randomString(),
      lastName: randomString(),
      mobile: "+200000000002",
      address: randomAddress(city?._id?.toString() as string),
      branchId: branch?._id?.toString() as string,
      roleId: (
        await repositories.citiesRepository.findOne({ name: "مدير فرع" })
      )?._id?.toString() as string,
      permissions: { access: true, edit: true },
      isAdmin: true,
    }),
  ]);

  await repositories.ordersRepository.create({
    destination: user?.address,
    orderType: "business_to_consumer",
    notes: "notes",
    totalPrice: products.reduce(
      (subTotal: number, product) => subTotal + product.price,
      0
    ),
    fulfillers: [
      {
        branchId: branch?._id?.toString() as string,
        organizationId: organization?._id?.toString() as string,
        name: organization?.name,
        origin: branch?.address,
        shippingStatus: "origin_branch",
        packages: products.map((product, i) => ({
          productId: product?._id?.toString() as string,
          quantity: i,
        })),
      },
    ],
  });

  const [driver, vehicle] = await Promise.all([
    repositories.usersRepository.create({
      firstName: randomString(),
      lastName: randomString(),
      mobile: "+200000000003",
      address: randomAddress(city?._id?.toString() as string),
      branchId: branch?._id?.toString() as string,
      roleId: (
        await repositories.citiesRepository.findOne({ name: "سائق" })
      )?._id?.toString() as string,
      permissions: { access: true, edit: true },
      isAdmin: true,
    }),
    repositories.vehiclesRepository.findOne({ name: "XYZ 000" }),
  ]);

  const stopPoint = randomAddress(city?._id?.toString() as string);

  await Promise.all([
    repositories.ridesRepository.create({
      destination: stopPoint,
      driverId: driver?._id?.toString() as string,
      isCompleted: true,
      origin: branch?.address,
      vehicleId: vehicle?._id?.toString() as string,
      packages: products.map((product, i) => ({
        productId: product?._id?.toString() as string,
        quantity: i,
      })),
    }),
    repositories.ridesRepository.create({
      destination: user?.address,
      driverId: driver?._id?.toString() as string,
      isCompleted: true,
      origin: stopPoint,
      vehicleId: vehicle?._id?.toString() as string,
      packages: products.map((product, i) => ({
        productId: product?._id?.toString() as string,
        quantity: i,
      })),
    }),
  ]);
};

run()
  .then(() => process.exit())
  .catch((err) => {
    console.error(err);
    return process.exit(1);
  });
