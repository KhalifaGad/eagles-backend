import * as yup from "yup";

export const employeeRatingSchema = yup
  .object()
  .shape({
    employee: yup.string().required(),
    agency: yup.string().required(),
    appearance: yup.number().required().min(1).max(100),
    hygiene: yup.number().required().min(1).max(100),
    individualTasks: yup.number().required().min(1).max(100),
    ordersExecution: yup.number().required().min(1).max(100),
    planPunctuality: yup.number().required().min(1).max(100),
    teamPlaying: yup.number().required().min(1).max(100),
    timePunctuality: yup.number().required().min(1).max(100),
    communicationSkills: yup.number().required().min(1).max(100),
    complaint: yup.string(),
    notes: yup.array().of(yup.string()),
    reward: yup.string(),
    deduction: yup.string(),
  })
  .noUnknown();
