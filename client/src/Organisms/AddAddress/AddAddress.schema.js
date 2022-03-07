import * as Yup from "yup";

export const fieldsValidation = {
  area: Yup.string().required("يجب ادخال المنطقه"),
  street: Yup.string().required("يجب ادخال اسم الشارع"),
  block: Yup.string().required("يجب ادخال رقم المبنى"),
  landmark: Yup.string().required("يجب ادخال علامه مميزه"),
  apartmentNumber: Yup.string(),
  floorNumber: Yup.string(),
  cityId: Yup.string().required("يجب اختيار مدينه"),
};

export const addressFields = [
  {
    width: "20%",
    name: "area",
    type: "text",
    label: "المنطقه",
    componentType: "input",
  },
  {
    width: "20%",
    name: "street",
    type: "text",
    label: "الشارع",
    componentType: "input",
  },
  {
    width: "20%",
    name: "block",
    type: "text",
    label: "رقم المبنى",
    componentType: "input",
  },
  {
    width: "20%",
    name: "apartmentNumber",
    type: "text",
    label: "رقم الشقه",
    componentType: "input",
  },
  {
    width: "20%",
    name: "floorNumber",
    type: "text",
    label: "الدور",
    componentType: "input",
  },
  {
    width: "42.5%",
    name: "landmark",
    type: "text",
    label: "علامه مميزه",
    componentType: "input",
  },
  {
    width: "20%",
    name: "cityId",
    label: "المدينه",
    type: "select",
    items: [],
  },
];

export const initialValues = {
  area: undefined,
  street: undefined,
  block: undefined,
  landmark: undefined,
  apartmentNumber: undefined,
  floorNumber: undefined,
  cityId: "",
};
