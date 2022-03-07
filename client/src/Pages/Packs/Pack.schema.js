import * as Yup from "yup";

/*
_id,
originBranchId,
destinationBranchId,
originCustomerType,
originCustomer,
destinationCustomerType,
destinationCustomer,
description,
products,
packCode,
isCOD,
totalPackPrice,
servicePrice,
date,
shippingStatus,
*/

export const fieldsValidation = {
  destinationBranchId: Yup.string().required("يجب اختيار فرع التوصيل"),
  originCustomerType: Yup.string().required("يجب اختيار نوع العميل"),
  originCustomer: Yup.string().required("يجب اختيار العميل"),
  destinationCustomerType: Yup.string().required("يجب اختيار نوع العميل"),
  destinationCustomer: Yup.string().required("يجب اختيار العميل"),
  description: Yup.string(),
  products: Yup.array().min(1).required("منتج واحد علي الاقل"),
  packCode: Yup.string().required("يجب ادخال كود الطرد"),
  totalPackPrice: Yup.string().matches(
    /^[\u0660-\u06690-9 ]+$/,
    "الارقام فقط مسموح بها"
  ),
  servicePrice: Yup.string().matches(
    /^[\u0660-\u06690-9 ]+$/,
    "الارقام فقط مسموح بها"
  ),
  date: Yup.date().required("يجب ادخال تاريخ استلام الطرد"),
  isCOD: Yup.bool().required("يجب الاختيار"),
};

const CustomerTypes = [
  { value: "Company", label: "شركه" },
  { value: "Client", label: "فرد" },
];

export const fromFields = [
  {
    width: "70%",
    name: "packCode",
    type: "text",
    label: "كود الطرد",
  },
  {
    width: "70%",
    name: "description",
    type: "text",
    label: "وصف الطرد",
  },
  {
    width: "70%",
    name: "totalPackPrice",
    type: "text",
    label: "سعر الطرد",
  },
  {
    width: "70%",
    name: "servicePrice",
    type: "text",
    label: "سعر خدمة التوصيل",
  },
  {
    width: "70%",
    name: "destinationBranchId",
    type: "select",
    label: "فرع التوصيل",
    items: [],
  },
  {
    width: "70%",
    name: "originCustomerType",
    type: "select",
    label: "نوع مالك الطرد",
    items: CustomerTypes,
  },
  {
    width: "70%",
    name: "originCustomer",
    type: "select",
    label: "اختر مالك الطرد",
    initialDisbale: true,
    items: [],
  },
  {
    width: "70%",
    name: "destinationCustomerType",
    type: "select",
    label: "نوع مستلم الطرد",
    items: CustomerTypes,
  },
  {
    width: "70%",
    name: "destinationCustomer",
    type: "select",
    label: "اختر مستلم الطرد",
    items: [],
    initialDisbale: true,
  },
  {
    width: "70%",
    name: "products",
    type: "select",
    multiple: true,
    label: "المنتجات",
    items: [],
  },
  {
    width: "70%",
    name: "isCOD",
    type: "select",
    label: "تحصيل عند الاستلام؟",
    items: [
      { value: true, label: "نعم" },
      { value: false, label: "لا" },
    ],
  },
];

export const initialValues = {
  destinationBranchId: "",
  originCustomerType: "",
  originCustomer: "",
  destinationCustomerType: "",
  destinationCustomer: "",
  description: undefined,
  products: "",
  packCode: undefined,
  totalPackPrice: undefined,
  servicePrice: undefined,
  isCOD: "",
};
