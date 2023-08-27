import { badData } from "@hapi/boom";
import DefaultRepository from "./default.repository";
import { AgencyModel } from "../models";
import { AddressInterface, AgencyInterface } from "../../types";
import { calculateDistance, getEntityRef } from "../../utilities";

class AgencyRepository extends DefaultRepository<AgencyInterface> {
  constructor() {
    super(AgencyModel, { path: "address.city" });
  }

  getNearestAgency = async (address: AddressInterface) => {
    const { lat, lng, city } = address;
    const cityEntityRef = getEntityRef(city);
    if (!lat || !lng || !cityEntityRef) {
      throw badData("عنوان غير سليم");
    }

    const { data: agencies } = await this.list({
      filter: {
        "address.city": cityEntityRef,
      },
      options: {
        showAll: true,
      },
    });

    return this.sortByDistanceToPoint(agencies, lat, lng).at(0);
  };

  private sortByDistanceToPoint = (agencies: AgencyInterface[], lat: number, lng: number) => {
    // Calculate the distance for each object and add it as a "distance" property
    const agenciesWithDistances = agencies.map(agency => ({
      ...agency,
      distance: calculateDistance(lat, lng, Number(agency.address.lat), Number(agency.address.lng)),
    }));

    // Sort the objects based on the "distance" property in ascending order
    agenciesWithDistances.sort((a, b) => a.distance - b.distance);

    // Remove the "distance" property if you don't need it in the final result
    return agenciesWithDistances.map(({ distance, ...rest }) => rest);
  };
}

export default new AgencyRepository();
