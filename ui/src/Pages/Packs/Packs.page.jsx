import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { /* useContext, */ useState } from "react";
import AddPack from "./AddPack.modal";
// import { APIContext } from "../../Contexts";
// import AddAddress from "../../Organisms/AddAddress/AddAddress.organism";

const PacksPage = () => {
  const [addPackState, setAddPackState] = useState(false);
  function handleCloseAddPack() {
    setAddPackState(false);
  }
  return (
    <Box>
      <AddPack open={addPackState} handleClose={handleCloseAddPack} />
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: "8%", right: "5%" }}
      >
        <AddIcon onClick={() => setAddPackState(true)} />
      </Fab>
    </Box>
  );
};

export default PacksPage;
