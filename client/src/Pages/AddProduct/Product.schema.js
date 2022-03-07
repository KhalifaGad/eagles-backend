import * as Yup from "yup";

export const fieldsValidation = {
  nameEn: Yup.string()
    .required("يجب ادخال الاسم بالانجليزي")
    .matches(/[A-Za-z0-9]+/),
  nameAr: Yup.string().required("يجب ادخال الاسم بالعربي"),
  descriptionEn: Yup.string(),
  descriptionAr: Yup.string(),
  price: Yup.string().matches(
    /^[\u0660-\u06690-9 ]+$/,
    "الارقام فقط مسموح بها"
  ),
  weight: Yup.string().matches(
    /^[\u0660-\u06690-9 ]+$/,
    "الارقام فقط مسموح بها"
  ),
  height: Yup.string().matches(
    /^[\u0660-\u06690-9 ]+$/,
    "الارقام فقط مسموح بها"
  ),
  width: Yup.string().matches(
    /^[\u0660-\u06690-9 ]+$/,
    "الارقام فقط مسموح بها"
  ),
  companyId: Yup.string().required("يجب اختيار الشركه"),
};

export const productFields = [
  {
    width: "30%",
    name: "nameEn",
    type: "text",
    label: "الاسم النجليزي",
  },
  {
    width: "30%",
    name: "nameAr",
    type: "text",
    label: "الاسم العربي",
  },
  {
    width: "30%",
    name: "descriptionEn",
    type: "text",
    label: "الوصف بالنجليزي",
  },
  {
    width: "30%",
    name: "descriptionAr",
    type: "text",
    label: "الوصف بالعربي",
  },
  {
    width: "30%",
    name: "price",
    type: "number",
    label: "سعر المنتج",
  },
  {
    width: "30%",
    name: "weight",
    type: "number",
    label: "الوزن",
  },
  {
    width: "30%",
    name: "height",
    type: "number",
    label: "الارتفاع",
  },
  {
    width: "30%",
    name: "width",
    type: "number",
    label: "العرض",
  },
  {
    width: "30%",
    name: "companyId",
    type: "select",
    label: "الشركه",
    items: [],
  },
];

export const initialValues = {
  nameEn: undefined,
  nameAr: undefined,
  descriptionEn: undefined,
  descriptionAr: undefined,
  price: undefined,
  weight: undefined,
  height: undefined,
  width: undefined,
  companyId: "",
};
