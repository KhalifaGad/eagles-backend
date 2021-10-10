import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Brand from "./Brand";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useHistory } from "react-router";

const AppNav = () => {
  const [drawerState, setDrawerState] = useState(false);
  const history = useHistory();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  function navTo(path) {
    history.push(path);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Brand variant="h5" />
        </Box>
        <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button onClick={() => navTo("/")}>
                <ListItemText primary={"الطرود"} />
              </ListItem>
              <ListItem button onClick={() => navTo("/add-product")}>
                <ListItemText primary={"اضافة منتج"} />
              </ListItem>
              <ListItem button>
                <ListItemText primary={"الموظفين"} />
              </ListItem>
              <ListItem button onClick={() => navTo("add-client")}>
                <ListItemText primary={"اضافة عميل"} />
              </ListItem>
              <ListItem button onClick={() => navTo("add-company")}>
                <ListItemText primary={"اضافة شركه"} />
              </ListItem>
              <ListItem button>
                <ListItemText primary={"اضافة زياره"} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary={"خروج"} />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default AppNav;
