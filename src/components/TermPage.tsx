import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { SearchTerm } from "./SearchResult";
import { useTerm } from "../api/TermAPI";
import NoResults from "./NoResults";
import DetailHeader from "./DetailHeader";
import Definition from "./Definition";

const TermPage: React.FC = () => {
  const { state } = useLocation<SearchTerm>();
  const { data = [], isLoading, isSuccess } = useTerm(state);
  const label = data.label?.cs;

  if (isLoading) return <Typography variant="h5">Načítání ...</Typography>;
  if (isSuccess) {
    return (
      <Box>
        <DetailHeader type="pojem" label={label} />
        <Container>
          <Definition data={data} />
        </Container>
      </Box>
    );
  }
  return <NoResults />;
};

export default TermPage;
