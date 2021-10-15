import React from "react";
import { Box } from "@material-ui/core";
import { useTerm } from "../api/TermAPI";
import NoResults from "./NoResults";
import TermHeader from "./TermHeader";
import TermDefinition from "./TermDefinition";
import { Hierarchy } from "./Hierarchy";
import useURLTerm from "../hooks/useURLTerm";
import Loader from "./Loader";

//This is a quick fix, not a final solution
export const emptyTerm = {
  uri: "",
  vocabulary: "",
};

const TermPage: React.FC = () => {
  const term = useURLTerm();
  const { data = [], isLoading, isSuccess } = useTerm(term ?? emptyTerm);

  if (isLoading) return <Loader />;
  if (isSuccess) {
    return (
      <Box mb={10}>
        <TermHeader data={data} />
        <TermDefinition data={data} />
        <Hierarchy data={data} />
      </Box>
    );
  }
  return <NoResults />;
};

export default TermPage;
