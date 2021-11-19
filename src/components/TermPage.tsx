import React from "react";
import { Box } from "@mui/material";
import { useTerm } from "../api/TermAPI";
import NoResults from "./NoResults";
import TermHeader from "./TermHeader";
import TermDefinition from "./TermDefinition";
import { Hierarchy } from "./Hierarchy";
import useURLTerm from "../hooks/useURLTerm";
import Loader from "./Loader";
import ErrorPage from "./ErrorPage";

const TermPage: React.FC = () => {
  const term = useURLTerm();
  const { data, isLoading, isSuccess, isError } = useTerm(term.$id);

  if (isLoading) return <Loader />;

  if (isError || !data) return <ErrorPage />;

  if (isSuccess) {
    return (
      <Box mb={2}>
        <TermHeader term={data} />
        <TermDefinition term={data} />
        <Hierarchy term={data} />
      </Box>
    );
  }
  return <NoResults />;
};

export default TermPage;
