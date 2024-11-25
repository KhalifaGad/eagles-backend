import * as yup from "yup";

export const credentialSchema = yup
  .object()
  .shape({
    mobile: yup.string().required(),
    password: yup.string().required(),
    accountType: yup.mixed().oneOf(["Merchant", "Client", "Employee"]).required(),
    account: yup.string().required(),
  })
  .noUnknown();

export const updateCredentialSchema = yup
  .object()
  .shape({
    mobile: yup.string(),
    password: yup.string(),
  })
  .noUnknown();

export const credentialLoginSchema = yup
  .object()
  .shape({
    mobile: yup.string().trim().required(),
    password: yup.string().min(6).required(),
  })
  .noUnknown();
