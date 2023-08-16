import { AccountEnum, MongooseID } from "../../types";
import { createHash } from "../../utilities";
import * as repositories from "../repositories";
import { citiesData, hubsData } from "./data";

export default async () => {
	// ***********  Cities *********** //
	await repositories.cityRepository.insertMany(citiesData);

	// ***********  Hubs *********** //
	await repositories.hubRepository.insertMany(
		await Promise.all(
			hubsData.map(async ({ name, cityEnglishName, address }) => {
				const city = await repositories.cityRepository.findOne({ englishName: cityEnglishName });

				return { name, address: { ...address, city: city._id as MongooseID } };
			})
		)
	);

	// ***********  Employee *********** //
	await repositories.credentialRepository.create({
		mobile: "+201099106299",
		accountType: AccountEnum.Employee,
		password: await createHash("Hakm2321"),
		account: await repositories.employeeRepository.create({
			name: "Khalifa",
			mobile: "+201099106299",
			email: "kkhalifa.gad@gamil.com",
			birthdate: new Date("1994-01-15"),
			position: "Alexandria",
			nationalId: "00000000000000",
			qualification: "Dummy",
			socialStatus: "Dummy",
			isAdmin: true,
			address: {
				city: (await repositories.cityRepository.findOne({ englishName: "Alexandria" }))._id as MongooseID,
				area: "Smouha",
				street: "Dummy",
			},
			salary: 86924,
		}),
	});
};
