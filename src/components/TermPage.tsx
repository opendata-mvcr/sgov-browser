import React from "react";
import { Typography } from "@material-ui/core";
import { useTerm } from "../api/TermAPI";
import { SearchTerm } from "./SearchResult";

const TermPage: React.FC = () => {
  //const {data = [], isLoading} = useTerm(props);
  //  console.log(data);
  return (
    <>
      <Typography variant="h1">TERM PAGE</Typography>
    </>
  );
};

export default TermPage;
