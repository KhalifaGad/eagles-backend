import { Box, Modal, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { useContext, useState } from "react";
// import { APIContext } from "../../Contexts";

const AddPack = ({ open, handleClose }) => {
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
          width: "80%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h2" color="primary">
          اضافة طرد
        </Typography>
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
