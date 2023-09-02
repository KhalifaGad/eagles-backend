import * as yup from "yup";

export const addressSchema = yup
  .object()
  .shape({
    _id: yup.string().nullable(),
    city: yup.string().required(),
    area: yup.string().required(),
    street: yup.string().required(),
    name: yup.string(),
    floorNumber: yup.string(),
    landmark: yup.string(),
    lat: yup.number(),
    lng: yup.number(),
    block: yup.string(),
    apartmentNumber: yup.string(),
    createdAt: yup.string().transform(() => undefined),
    updatedAt: yup.string().transform(() => undefined),
  })
  .noUnknown();

export const queryParamsSchema = yup
  .object()
  .shape({
    filter: yup.mixed(),
    options: yup.object().shape({
      page: yup.string().transform(Number),
      pageLimit: yup.string().transform(Number),
      sortBy: yup.string(),
      sortDirection: yup.string(),
      showAll: yup.boolean(),
    }),
  })
  .noUnknown();
