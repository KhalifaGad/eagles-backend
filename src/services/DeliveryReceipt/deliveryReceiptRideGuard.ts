import { badData, notFound } from "~errors/index.js";
import { rideRepository } from "~infra/index.js";
import { DeliveryReceiptPartTypeEnum, ID } from "~types/index.js";

export async function isRideValidForDeliveryReceipt(
  recipientType: DeliveryReceiptPartTypeEnum,
  originatorAgencyId?: ID | null,
  originatorHubId?: ID | null,
  rideCode?: string
) {
  if (!rideCode && recipientType !== DeliveryReceiptPartTypeEnum.Ride) return;
  if (!rideCode) throw notFound("الرحلة غير موجودة");

  const ride = await rideRepository.findOne({ code: rideCode });
  if (!ride) throw notFound("الرحلة غير موجودة");
  if (!ride.startDate) throw badData("لا يمكن استلام شحنة من رحلة لم تبدأ بعد");
  if (ride.endDate) throw badData("لا يمكن استلام شحنة من رحلة انتهت بالفعل");

  const isAgencyStepExist =
    originatorAgencyId &&
    ride.steps.some(step => step.stepLocationEntity?._id?.toString() === originatorAgencyId.toString());

  const isHubStepExist =
    originatorHubId && ride.steps.some(step => step.stepLocationEntity?._id?.toString() === originatorHubId.toString());

  if (!isAgencyStepExist && !isHubStepExist) {
    throw badData("لا يمكن استلام شحنة من رحلة لم تمر عبر الوكالة أو المخزن");
  }
}
