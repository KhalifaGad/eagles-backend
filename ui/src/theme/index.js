import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
    mode: "dark",
  },
  direction: "rtl",
});

export default theme;
