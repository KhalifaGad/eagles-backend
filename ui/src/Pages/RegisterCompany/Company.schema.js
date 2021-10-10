import * as Yup from "yup";

export const companyFieldsValidation = {
  name: Yup.string().required("يجب ادخال اسم الشركه"),
  businessType: Yup.string().required("يجب ادخال نوع العمل"),
  ownerName: Yup.string(),
  ownerMobile: Yup.string(),
  telephone: Yup.string().required(),
};

export const managerFieldsValidation = {
  name: Yup.string().required("يجب ادخال اسم الشركه"),
  departmentName: Yup.string().required("يجب ادخال اسم القسم"),
  mobile: Yup.string(),
};

export const companyFields = [
  {
    width: "40%",
    name: "name",
    type: "text",
    label: "اسم الشركه",
    componentType: "input",
  },
  {
    width: "40%",
    name: "businessType",
    type: "text",
    label: "نوع العمل",
    componentType: "input",
  },
  {
    width: "40%",
    name: "ownerName",
    type: "text",
    label: "اسم مالك الشركه",
    componentType: "input",
  },
  {
    width: "40%",
    name: "telephone",
    type: "text",
    label: "هاتف الشركه",
    componentType: "input",
  },
  {
    width: "40%",
    name: "ownerMobile",
    type: "text",
    label: "هاتف مالك الشركه",
    componentType: "input",
  },
];

export const managerFields = [
  {
    width: "40%",
    name: "name",
    type: "text",
    label: "اسم المدير",
    componentType: "input",
  },
  {
    width: "40%",
    name: "departmentName",
    type: "text",
    label: "اسم القسم",
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

export const companyInitialValues = {
  name: "",
  businessType: "",
  ownerName: "",
  ownerMobile: "",
  telephone: "",
};

export const managerInitialValues = {
  name: "",
  departmentName: "",
  mobile: "",
};
