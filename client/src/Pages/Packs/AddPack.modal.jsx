import { Box, Modal, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState, useEffect, useMemo } from "react";
import { APIContext, CacheContext } from "../../Contexts";
import Form from "../../Components/Form";
import { fieldsValidation, initialValues, fromFields } from "./Pack.schema";
import { ToastsStore } from "react-toasts";

// isServicePaid isServicePaid isServicePaid isServicePaidv isServicePaid isServicePaid

const AddPack = ({ open, handleClose }) => {
  const { API } = useContext(APIContext);
  const { clients, companies, products } = useContext(CacheContext);
  const [packFields, setPackFields] = useState(fromFields);

  function handleSubmit(data) {
    console.log(data);
  }

  function onCustomerTypeChange(fieldName) {
    return (type) => {
      if (type === "Client") {
        setPackFields(
          packFields.map((field) => {
            if (field.name !== fieldName) return field;
            field.items = clients.map((client) => ({
              value: client._id,
              label: client.mobile,
            }));
            return field;
          })
        );
      } else {
        setPackFields(
          packFields.map((field) => {
            if (field.name !== fieldName) return field;
            field.items = companies.map((company) => ({
              value: company._id,
              label: company.name,
            }));
            return field;
          })
        );
      }
    };
  }

  useEffect(() => {
    const items = packFields.find((field) => field.name === "products").items;
    if (items.length === products.length) {
      return;
    }

    setPackFields(
      packFields.map((field) => {
        if (field.name !== "products") return field;
        field.items = products.map((product) => ({
          value: product._id,
          label: product.nameAr,
        }));
        return field;
      })
    );
  }, [products, packFields]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          bgcolor: "background.paper",
          border: "0px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h2" color="primary">
          اضافة طرد
        </Typography>
        <Box
          sx={{
            marginTop: "1vh",
            paddingTop: "1vh",
            height: "60vh",
            overflow: "scroll",
          }}
        >
          <Form
            initialValues={initialValues}
            validationSchema={fieldsValidation}
            onSubmit={handleSubmit}
            fields={packFields}
            onChangeListeners={{
              originCustomerType: onCustomerTypeChange("originCustomer"),
              destinationCustomerType: onCustomerTypeChange(
                "destinationCustomer"
              ),
            }}
            submitText="اضافه"
            formStyle={{
              gap: 4,
            }}
          />
        </Box>
        <Button
          onClick={handleClose}
          sx={{ position: "absolute", top: "4%", right: "1%" }}
        >
          <CloseIcon />
        </Button>
      </Box>
    </Modal>
  );
};

export default AddPack;
