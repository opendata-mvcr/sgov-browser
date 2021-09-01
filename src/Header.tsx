import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { ReactComponent as NavIcon } from "./assets/navIcon.svg";

const Header: React.FC = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <NavIcon />
        <Typography variant="h6" color="textSecondary">
          sgov-browser
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
