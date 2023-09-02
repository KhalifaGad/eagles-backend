import * as yup from "yup";

export const deliveryReceiptSchema = yup
  .object()
  .shape({
    _id: yup.string().nullable(),
    type: yup.mixed().oneOf(["Receive", "Delivery"]),
    attributedTo: yup.mixed().oneOf(["Hub", "Agency", "Ride"]),
    shipments: yup.array().of(yup.string()).min(1).required(),
    recipient: yup.string().required(),
    originator: yup.string().required(),
    isRecipientConfirmed: yup.boolean().default(false),
    createdAt: yup.string().transform(() => undefined),
    updatedAt: yup.string().transform(() => undefined),
  })
  .noUnknown();
