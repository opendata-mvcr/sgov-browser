import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import useRouteQuery from "../hooks/useRouteQuery";
import { useSearch } from "../api/WordsAPI";

const Word: React.FC = () => {
  const routeQuery = useRouteQuery();
  const wordLabel = routeQuery.get("label");
  const { data = [], isSuccess } = useSearch(wordLabel ?? undefined);


  return (
    <>
      <Typography variant="h1">Word disambiguation page</Typography>
      </>

  );
};

export default Word;
