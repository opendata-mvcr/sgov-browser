import { AppBar, Box, Toolbar } from "@material-ui/core";
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
        <NavIcon />
        <RouteLink to="/" variant="h6" color="textSecondary" underline="none">
          sgov-browser
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
