import * as Yup from "yup";

export const fieldsValidation = {
  mobile: Yup.string().nullable(),
  // .matches(/^[\u0660-\u06690-9 ]+$/, "الارقام فقط مسموح بها")
  // .max(11, "يجب ان يكون ١١ رقم")
  // .min(9, "يجب ان يكون ١١ رقم"),
  // .required("يجب ادخال رقم الموبيل"),
  password: Yup.string().nullable(),
  // .min(8, "لا يجب ان يقل عن ٨ حروف"),
  // .required("يجب ادخال كلمة المرور"),
};

export const loginFields = [
  {
    name: "mobile",
    type: "text",
    label: "رقم الموبيل",
    componentType: "input",
  },
  {
    name: "password",
    type: "password",
    label: "كلمة المرور",
    componentType: "input",
  },
];

export const initialValues = {
  mobile: "",
  password: "",
};
