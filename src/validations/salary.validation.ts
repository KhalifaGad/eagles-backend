import * as yup from "yup";

export const salarySchema = yup
  .object()
  .shape({
    employee: yup.string().required(),
    agency: yup.string().required(),
    baseSalary: yup.number().required(),
    deduction: yup.number(),
    reward: yup.number(),
    finalSalary: yup.number(),
    deductionReason: yup.string(),
    rewardReason: yup.string(),
    billed: yup.boolean(),
  })
  .noUnknown();
