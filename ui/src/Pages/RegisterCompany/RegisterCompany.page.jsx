import { Box, Typography, Paper, Button, List, ListItem } from "@mui/material";
import { useContext, useRef, useState } from "react";
import Form from "../../Components/Form";
import { APIContext } from "../../Contexts";
import AddAddress from "../../Organisms/AddAddress/AddAddress.organism";
import {
  companyInitialValues,
  managerInitialValues,
  companyFields,
  managerFields,
  companyFieldsValidation,
  managerFieldsValidation,
} from "./Company.schema";
import { ToastsStore } from "react-toasts";

const RegiserCompanyPage = () => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const { API } = useContext(APIContext);

  function addressSubmit(data) {
    setAddress(data);
    setStep((prev) => prev + 1);
  }

  async function companySubmit(data) {
    setCompany(data);
    setStep((prev) => prev + 1);
  }

  async function managersSubmit(data) {
    const result = await API.addCompany(company, data, address);
    if (result.error) return ToastsStore.error(result.error);
    ToastsStore.success("Company successfuly added");
    setStep(1);
    setAddress(undefined);
    setCompany(undefined);
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ m: "2%" }}>
        اضافة شركه
      </Typography>
      {step === 1 && <AddAddress submit={addressSubmit} />}
      {step === 2 && <AddCompany submit={companySubmit} />}
      {step === 3 && (
        <AddManagers submit={managersSubmit} skip={managersSubmit} />
      )}
    </Box>
  );
};

const AddCompany = ({ submit }) => {
  return (
    <ComponentsWrapper headText={"بيانات الشركه"}>
      <Box sx={{ mx: "2vw", pt: "5vh" }}>
        <Form
          initialValues={companyInitialValues}
          validationSchema={companyFieldsValidation}
          onSubmit={submit}
          fields={companyFields}
          submitText="التالي"
          formStyle={{
            gap: 4,
            useRow: true,
          }}
        />
      </Box>
    </ComponentsWrapper>
  );
};

const AddManagers = ({ submit, skip }) => {
  const [managersIterator, setManagersIterator] = useState([]);
  const [managers, setManagers] = useState([]);
  const controlsRef = useRef(undefined);

  function addManager() {
    setManagersIterator((prev) =>
      prev.concat([`manager placeholder ${prev.length + 1}`])
    );
    setTimeout(() => {
      controlsRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  }

  function submitManager(data) {
    setManagers((prev) => [...prev, data]);
    return true;
  }

  function submitAll() {
    submit(managers);
  }

  return (
    <ComponentsWrapper headText={"اضافة المديرين"}>
      <List>
        {managersIterator.map((iterator) => (
          <ListItem key={iterator}>
            <Form
              disableAfterSubmit
              initialValues={managerInitialValues}
              fields={managerFields}
              validationSchema={managerFieldsValidation}
              submitText="تاكيد"
              onSubmit={submitManager}
              formStyle={{
                gap: 4,
                useRow: true,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          marginBottom: "2vh",
        }}
        ref={controlsRef}
      >
        <Button color="secondary" onClick={() => addManager()}>
          اضافة مدير
        </Button>
        <Button color="secondary" onClick={() => skip()}>
          تخطي
        </Button>
        <Button color="secondary" onClick={() => submitAll()}>
          اضافة الكل
        </Button>
      </Box>
    </ComponentsWrapper>
  );
};

const ComponentsWrapper = ({ children, headText }) => {
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
          height: "51vh",
          overflowY: "scroll",
        }}
      >
        <Typography
          variant="h4"
          color="secondary"
          sx={{ ml: "1vw", mt: "1vh" }}
        >
          {headText}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
};

export default RegiserCompanyPage;
