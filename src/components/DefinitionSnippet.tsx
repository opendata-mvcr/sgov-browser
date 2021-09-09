import React from "react";
import { SearchTerm } from "./SearchResult";
import { useTerm } from "../api/TermAPI";
import { Typography } from "@material-ui/core";

const DefinitionSnippet: React.FC<SearchTerm> = (props) => {
  //TODO: limit the length of the snippet text
  const { data = [], isLoading, isSuccess } = useTerm(props);
  if (isLoading) return <Typography variant="h5">Načítání definice</Typography>;
  if (isSuccess)
    return <Typography variant="h5">{data.definition?.cs}</Typography>;
  return <></>;
};

export default DefinitionSnippet;
