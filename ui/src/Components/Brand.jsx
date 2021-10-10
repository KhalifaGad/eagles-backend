import { Box, Typography } from "@mui/material";

const Brand = ({ variant }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Typography variant={variant} color="secondary">
        E
      </Typography>
      <Typography variant={variant}>gyptian</Typography>
      <Typography variant={variant} color="secondary" sx={{ mr: "5px" }}>
        {" E"}
      </Typography>
      <Typography variant={variant}>agls</Typography>
    </Box>
  );
};

export default Brand;

/* 


.Orange {
    color:#ff9800;
}
*/
