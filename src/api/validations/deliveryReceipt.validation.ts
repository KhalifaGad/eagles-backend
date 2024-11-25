import * as yup from "yup";

export const deliveryReceiptSchema = yup
  .object()
  .shape({
    _id: yup.string().nullable(),
    reference: yup.string().nullable(),
    type: yup.mixed().oneOf(["Receive", "Delivery"]),
    shipments: yup.array().of(yup.string()).min(1).required(),
    recipient: yup.string(),
    recipientHub: yup.string(),
    recipientAgency: yup.string(),
    recipientType: yup.mixed().oneOf(["Hub", "Agency", "Ride"]),
    originator: yup.string().required(),
    originatorHub: yup.string(),
    originatorAgency: yup.string(),
    originatorType: yup.mixed().oneOf(["Hub", "Agency", "Ride"]),
    rideCode: yup.string(),
    isRecipientConfirmed: yup.boolean().default(false),
    createdAt: yup.string().transform(() => undefined),
    updatedAt: yup.string().transform(() => undefined),
  })
  .noUnknown();
