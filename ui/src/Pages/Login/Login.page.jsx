import Form from "../../Components/Form";
import { fieldsValidation, loginFields, initialValues } from "./Login.schema";
import { Box, useTheme } from "@mui/material";
import { useContext } from "react";
import { APIContext, UserContext } from "../../Contexts";
import { ToastsStore } from "react-toasts";
import Brand from "../../Components/Brand";

const Login = () => {
  const theme = useTheme();
  const { API } = useContext(APIContext);
  const { setUser, setBranch } = useContext(UserContext);

  async function onSubmit(data) {
    const { mobile, password } = data;
    const { error, employee, branch } = await API.login(mobile, password);
    if (error) {
      ToastsStore.error(error);
      return false;
    }
    setUser(employee);
    setBranch(branch);
    return true;
  }

  return (
    <Box
      margin="auto"
      mt="15%"
      width="50%"
      alignItems="center"
      justifyItems="center"
      textAlign="center"
      boxShadow={theme.shadows[24]}
      bgcolor={theme.palette.grey[900]}
      height="50%"
      paddingTop="1%"
    >
      <Box
        sx={{
          paddingRight: "35%",
          mb: "5vh",
          mt: "3vh",
        }}
      >
        <Brand variant="h4" />
      </Box>
      <Form
        initialValues={initialValues}
        validationSchema={fieldsValidation}
        onSubmit={onSubmit}
        fields={loginFields}
        submitText="تسجيل الدخول"
        formStyle={{
          gap: 4,
        }}
      />
    </Box>
  );
};

export default Login;
