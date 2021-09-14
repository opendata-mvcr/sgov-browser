import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { SearchTerm } from "./SearchResult";
import { useTerm } from "../api/TermAPI";
import NoResults from "./NoResults";
import TermHeader from "./TermHeader";
import Definition from "./Definition";

const TermPage: React.FC = () => {
  const { state } = useLocation<SearchTerm>();
  const { data = [], isLoading, isSuccess } = useTerm(state);

  if (isLoading) return <Typography variant="h5">Načítání ...</Typography>;
  if (isSuccess) {
    return (
      <Box>
        <TermHeader data={data} />
        <Definition data={data} />
      </Box>
    );
  }
  return <NoResults />;
};

export default TermPage;
