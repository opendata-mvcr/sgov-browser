import React from "react";
import { Box, BoxProps, styled } from "@mui/material";

const SearchCard: React.FC<BoxProps> = (props) => {
  const Wrapper = styled(Box)(({ theme }) => ({
    borderLeft: "solid",
    borderLeftWidth: "4px",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    "&:hover": {
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
    },
  }));

  return <Wrapper {...props}>{props.children}</Wrapper>;
};

export default SearchCard;
