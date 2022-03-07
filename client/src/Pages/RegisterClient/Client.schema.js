import * as Yup from "yup";

export const fieldsValidation = {
  firstName: Yup.string().required("يجب ادخال الاسم الاول"),
  lastName: Yup.string().required("يجب ادخال الاسم الثاني"),
  mobile: Yup.string().required("يجب ادخال رقم الهاتف"),
};

export const clientFields = [
  {
    width: "40%",
    name: "firstName",
    type: "text",
    label: "الاسم الاول",
    componentType: "input",
  },
  {
    width: "40%",
    name: "lastName",
    type: "text",
    label: "الاسم الثاني",
    componentType: "input",
  },
  {
    width: "40%",
    name: "mobile",
    type: "text",
    label: "رقم الهاتف",
    componentType: "input",
  },
];

export const initialValues = {
  firstName: undefined,
  lastName: undefined,
  mobile: undefined,
};
