import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import { ReactComponent as NavIcon } from "./assets/navIcon.svg";
import SearchBar from "./components/SearchBar";
import RouteLink from "./components/RouteLink";

interface HeaderProps {
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <RouteLink to="/" variant="h6" color="textSecondary" underline="none">
          <Box display="flex">
            <Box display="flex" alignItems="center" justifyContent="center">
              <NavIcon display="block" />
            </Box>
            ShowIt
          </Box>
        </RouteLink>
        {props.showSearch && (
          <Box width={250} ml={10}>
            <SearchBar size="small" />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
