import * as yup from "yup";

export const citySchema = yup
  .object()
  .shape({
    arabicName: yup.string().required(),
    englishName: yup.string().required(),
  })
  .noUnknown();
