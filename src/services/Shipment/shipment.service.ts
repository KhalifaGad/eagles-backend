import { shipmentRepository } from "~infra/index.js";
import { ShipmentModel } from "~infra/mongoDB/models/index.js";
import { ShipmentFinancialReportPayload, ShipmentInterface } from "~types/index.js";
import DefaultService from "../default.service.js";
import { startOfDay, endOfDay } from "date-fns";

class ShipmentService extends DefaultService<ShipmentInterface> {
  constructor() {
    super(shipmentRepository);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create = async (payload: ShipmentInterface): Promise<ShipmentInterface> => {
    throw new Error("Method should not be used, use CreateShipmentService instead");
  };

  async getFinancialReport(payload: ShipmentFinancialReportPayload) {
    const { startDate, endDate } = payload;

    return ShipmentModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay(new Date(startDate)), $lte: endOfDay(new Date(endDate)) },
          $or: [
            { status: "DELIVERED" },
            { status: "RETURNED_TO_ORIGIN" },
            { $and: [{ isReturning: true }, { status: "DELIVERED" }] },
          ],
        },
      },
      {
        $lookup: {
          from: "shipments",
          localField: "returnShipment",
          foreignField: "_id",
          as: "returnShipmentData",
        },
      },
      {
        $lookup: {
          from: "companies",
          let: { refId: "$consignor", refType: "$consignorType" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$_id", "$$refId"] }, { $eq: [{ $literal: "Company" }, "$$refType"] }],
                },
              },
            },
          ],
          as: "consignorCompanyData", // Renamed to avoid conflict
        },
      },
      {
        $lookup: {
          from: "clients",
          let: { refId: "$consignor", refType: "$consignorType" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$_id", "$$refId"] }, { $eq: [{ $literal: "Client" }, "$$refType"] }],
                },
              },
            },
          ],
          as: "consignorClientData", // Renamed to avoid conflict
        },
      },
      {
        $lookup: {
          from: "companies",
          let: { refId: "$consignee", refType: "$consigneeType" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$_id", "$$refId"] }, { $eq: [{ $literal: "Company" }, "$$refType"] }],
                },
              },
            },
          ],
          as: "consigneeCompanyData", // Renamed to avoid conflict
        },
      },
      {
        $lookup: {
          from: "clients",
          let: { refId: "$consignee", refType: "$consigneeType" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$_id", "$$refId"] }, { $eq: [{ $literal: "Client" }, "$$refType"] }],
                },
              },
            },
          ],
          as: "consigneeClientData", // Renamed to avoid conflict
        },
      },
      {
        $lookup: {
          from: "agencies",
          localField: "originAgency",
          foreignField: "_id",
          as: "originAgencyData",
        },
      },
      {
        $lookup: {
          from: "agencies",
          localField: "destinationAgency",
          foreignField: "_id",
          as: "destinationAgencyData",
        },
      },
      // ... $unwind stages ...

      {
        $project: {
          _id: 0,
          shipment_code: "$code",
          shipment_status: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$status", "RETURNED_TO_ORIGIN"] },
                  then: "RETURNED_TO_ORIGIN",
                },
                {
                  case: {
                    $and: [{ $eq: ["$isReturning", true] }, { $eq: ["$status", "DELIVERED"] }],
                  },
                  then: "RETURN_DELIVERY",
                },
              ],
              default: "DELIVERED", // If none of the above, it's DELIVERED
            },
          },
          return_shipment_code: { $ifNull: [{ $arrayElemAt: ["$returnShipmentData.code", 0] }, null] }, // Use $arrayElemAt
          shipment_total_price: {
            $add: ["$shippingFees", "$collectCashFees", "$shipmentPrice"],
          },
          shipment_price: "$shipmentPrice",
          collect_cash_fees: "$collectCashFees",
          shipping_fees: "$shippingFees",
          delivered_products_price: { $sum: "$products.price" },
          returned_products_price: { $sum: "$returns.price" },
          sender: {
            $ifNull: [
              { $arrayElemAt: ["$consignorClientData.name", 0] }, // Access from specific array
              { $arrayElemAt: ["$consignorCompanyData.name", 0] }, // Access from specific array
              null,
            ],
          },
          sender_phone: {
            $ifNull: [
              { $arrayElemAt: ["$consignorClientData.mobile", 0] }, // Access from specific array
              { $arrayElemAt: ["$consignorCompanyData.mobile", 0] }, // Access from specific array
              null,
            ],
          },
          sender_type: { $ifNull: ["$consignorType", null] },
          receiver: {
            $ifNull: [
              { $arrayElemAt: ["$consigneeClientData.name", 0] }, // Access from specific array
              { $arrayElemAt: ["$consigneeCompanyData.name", 0] }, // Access from specific array
              null,
            ],
          },
          receiver_phone: {
            $ifNull: [
              { $arrayElemAt: ["$consigneeClientData.mobile", 0] }, // Access from specific array
              { $arrayElemAt: ["$consigneeCompanyData.mobile", 0] }, // Access from specific array
              null,
            ],
          },
          receiver_type: { $ifNull: ["$consigneeType", null] },
          is_in_city: "$isInCity",
          origin_agency_name: { $arrayElemAt: ["$originAgencyData.name", 0] }, // Use $arrayElemAt
          destination_agency_name: { $ifNull: [{ $arrayElemAt: ["$destinationAgencyData.name", 0] }, null] }, // Use $arrayElemAt
          created_at: "$createdAt",
        },
      },
    ]).exec();
  }
}

export default new ShipmentService();
