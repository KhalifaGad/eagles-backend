import { Box } from "@mui/material";
import { FullLogo } from "../styles";

const Brand = ({ height, size }) => {
  return (
    <Box
      sx={{
        height: height,
        width: "100%",
      }}
    >
      <FullLogo height={size} />
    </Box>
  );
};

export default Brand;
