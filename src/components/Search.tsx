import React from "react";
import { Typography } from "@material-ui/core";
import { useSearch } from "../api/WordsAPI";
import useRouteQuery from "../hooks/useRouteQuery";

const Search: React.FC = () => {
  const routeQuery = useRouteQuery();
  const wordLabel = routeQuery.get("label");
  const { data = [], isSuccess } = useSearch(wordLabel ?? undefined);
  return (
    <>
      <Typography variant="h1">Search results - WIP</Typography>
      {isSuccess &&
        data.map((item) => {
          return <Typography variant="caption" key={item.label}>{item.label}</Typography>;
        })}
    </>
  );
};

export default Search;
