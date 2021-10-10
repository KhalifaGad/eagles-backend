import { Box, Typography, Paper } from "@mui/material";
import { useContext, useState } from "react";
import Form from "../../Components/Form";
import { APIContext } from "../../Contexts";
import AddAddress from "../../Organisms/AddAddress/AddAddress.organism";
import { clientFields, fieldsValidation, initialValues } from "./Client.schema";
import { ToastsStore } from "react-toasts";

const RegiserClientPage = () => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(undefined);
  const { API } = useContext(APIContext);

  function addressSubmit(data) {
    setAddress(data);
    setStep((prev) => prev + 1);
  }

  async function clientSubmit(data) {
    const result = await API.addClient(data, address);
    if (result.error) return ToastsStore.error(result.error);
    ToastsStore.success("Client successfuly added!.");
    setStep(1);
    setAddress(undefined);
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ m: "2%" }}>
        اضافة عميل
      </Typography>
      {step === 1 && <AddAddress submit={addressSubmit} />}
      {step > 1 && <AddClient submit={clientSubmit} />}
    </Box>
  );
};

const AddClient = ({ submit }) => {
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
          بيانات شخصيه
        </Typography>
        <Box sx={{ mx: "2vw", pt: "5vh" }}>
          <Form
            initialValues={initialValues}
            validationSchema={fieldsValidation}
            onSubmit={submit}
            fields={clientFields}
            submitText="اضافه"
            formStyle={{
              gap: 4,
              useRow: true,
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default RegiserClientPage;
