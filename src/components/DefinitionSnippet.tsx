import React from "react";
import { SearchTerm } from "./SearchResult";
import { useTerm } from "../api/TermAPI";
import { Typography } from "@material-ui/core";

const MAX_CHARACTER = 177;

const DefinitionSnippet: React.FC<SearchTerm> = (props) => {
  const { data = [], isLoading, isSuccess } = useTerm(props);
  const definition = data.definition?.cs;

  if (isLoading) return <Typography variant="h5">Načítání definice</Typography>;
  if (isSuccess && definition) {
    return (
      <Typography variant="h5">
        {definition?.length > MAX_CHARACTER
          ? definition.substr(0, MAX_CHARACTER).concat(" ...")
          : definition}
      </Typography>
    );
  }

  return <></>;
};

export default DefinitionSnippet;
