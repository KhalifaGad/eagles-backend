import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMemo, useState } from "react";
import { isEnglishNumber, numFromArabicToEnglish } from "../utils/translate";

const Form = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitText,
  formStyle = {},
  disableAfterSubmit,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: innerOnSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const [shouldDisable, setShoudDisable] = useState(false);

  async function innerOnSubmit(args) {
    const numricFields = fields.filter((field) => field.type === "number");
    numricFields.forEach((numricField) => {
      args[numricField.name] = isEnglishNumber(args[numricField.name])
        ? args[numricField.name]
        : numFromArabicToEnglish(args[numricField.name]);
    });

    const result = await onSubmit(args);
    if (result && disableAfterSubmit) {
      setShoudDisable(true);
    }
    return result;
  }

  const getFormStyle = useMemo(() => {
    let styles = {
      boxShadow: formStyle.boxShadow,
      bgcolor: formStyle.bgcolor,
      gap: formStyle.gap,
      width: formStyle.width ?? "100%",
      alignItems: "center",
    };
    if (formStyle.useRow) {
      styles = {
        ...styles,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      };
    }
    return styles;
  }, [formStyle]);

  function getField(field) {
    if (field.type === "select") {
      return (
        <FormSelect
          formik={formik}
          field={field}
          formStyle={formStyle}
          key={field.name}
        />
      );
    }
    return (
      <FormTextField
        formik={formik}
        field={field}
        formStyle={formStyle}
        key={field.name}
      />
    );
  }

  return (
    <FormGroup sx={getFormStyle} onSubmit={formik.handleSubmit}>
      {fields.map((field) => getField(field))}
      <LoadingButton
        key="form-submit-btn"
        fullWidth
        loading={formik.isSubmitting}
        onClick={formik.handleSubmit}
        disabled={shouldDisable}
      >
        {submitText}
      </LoadingButton>
    </FormGroup>
  );
};

const FormTextField = ({ formik, field, formStyle }) => {
  const inputType = field.type === "number" ? "text" : field.type;
  return (
    <TextField
      error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
      id={field.name}
      name={field.name}
      type={inputType}
      label={field.label}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[field.name]}
      color={formStyle.color ?? "secondary"}
      helperText={formik.errors[field.name]}
      style={{
        width: field.width ?? "80%",
      }}
      FormHelperTextProps={{
        sx: {
          position: "absolute",
          bottom: "-40%",
        },
      }}
    />
  );
};

const FormSelect = ({ formik, field, formStyle }) => {
  return (
    <FormControl
      sx={{
        width: field.width ?? "80%",
      }}
      key={field.name}
      error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
      color={formStyle.color ?? "secondary"}
    >
      <InputLabel id={`select-label-${field.name}`}>{field.label}</InputLabel>
      <Select
        id={field.name}
        name={field.name}
        labelId={`select-label-${field.name}`}
        value={formik.values[field.name]}
        label={field.label}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {field.items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText
        sx={{
          position: "absolute",
          bottom: "-40%",
        }}
      >
        {formik.errors[field.name]}
      </FormHelperText>
    </FormControl>
  );
};

export default Form;
