import { Box, Typography, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Form from "../../Components/Form";
import APIContext from "../../Contexts/API/API.context";
import {
  fieldsValidation,
  productFields,
  initialValues,
} from "./Product.schema";
import { ToastsStore } from "react-toasts";

const AddProduct = () => {
  const { API } = useContext(APIContext);
  const [companies, setCompanies] = useState([]);
  const [formFields, setFormFields] = useState(productFields);

  useEffect(() => {
    async function fetchCompanies() {
      const result = await API.getCompanies();
      if (result.error) {
        ToastsStore.error(result.error);
      } else {
        setCompanies(result);
      }
    }

    fetchCompanies();
  }, [API]);

  useEffect(() => {
    setFormFields(
      productFields.map((field) => {
        if (field.name !== "companyId") return field;
        field.items = companies.map((company) => ({
          value: company._id,
          label: company.name,
        }));
        return field;
      })
    );
  }, [companies]);

  async function handleSubmit(data) {
    const { error } = await API.addProduct(data);
    if (error) {
      ToastsStore.error(error);
      return false;
    }
    ToastsStore.success("تم اضافة المنتج بنجاح");
    return true;
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ m: "2%" }}>
        اضافة منتج
      </Typography>
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
            height: "60vh",
            overflowY: "auto",
          }}
        >
          <Box sx={{ mx: "2vw", pt: "5vh" }}>
            <Form
              initialValues={initialValues}
              validationSchema={fieldsValidation}
              onSubmit={handleSubmit}
              fields={formFields}
              submitText="اضافه"
              formStyle={{
                gap: 4,
                useRow: true,
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddProduct;
