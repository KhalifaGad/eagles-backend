import { Box, Typography, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Form from "../../Components/Form";
import APIContext from "../../Contexts/API/API.context";
import {
  fieldsValidation,
  addressFields,
  initialValues,
} from "./AddAddress.schema";
import { ToastsStore } from "react-toasts";

const AddAddress = ({ submit, shouldReset }) => {
  const { API } = useContext(APIContext);
  const [cities, setCities] = useState([]);
  const [formFields, setFormFields] = useState(addressFields);

  useEffect(() => {
    async function fetchCities() {
      const result = await API.getCities();
      if (result.error) {
        ToastsStore.error(result.error);
      } else {
        setCities(result);
      }
    }

    fetchCities();
  }, [API]);

  useEffect(() => {
    setFormFields(
      addressFields.map((field) => {
        if (field.name !== "cityId") return field;
        field.items = cities.map((city) => ({
          value: city._id,
          label: city.name,
        }));
        return field;
      })
    );
  }, [cities]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "5%",
      }}
    >
      <Paper
        elevation={16}
        sx={{
          height: "50vh",
        }}
      >
        <Typography
          variant="h4"
          color="secondary"
          sx={{ ml: "1vw", mt: "1vh" }}
        >
          العنوان
        </Typography>
        <Box sx={{ mx: "2vw", pt: "5vh" }}>
          <Form
            initialValues={initialValues}
            validationSchema={fieldsValidation}
            onSubmit={submit}
            fields={formFields}
            submitText="التالي"
            formStyle={{
              gap: 4,
              useRow: true,
            }}
            shouldReset={shouldReset}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default AddAddress;
