import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useTerm } from "../api/TermAPI";
import NoResults from "./NoResults";
import TermHeader from "./TermHeader";
import Definition from "./Definition";
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
  //Currently accepts object from previous page or sends empty object => query will not be processed
  //In the future decision could be made whether to parse the location path or use passed object from previous page
  const { data = [], isLoading, isSuccess } = useTerm(term ?? emptyTerm);

  if (isLoading) return <Loader/>;
  if (isSuccess) {
    return (
      <Box mb={10}>
        <TermHeader data={data} />
        <Definition data={data} />
        <Hierarchy data={data} />
      </Box>
    );
  }
  return <NoResults />;
};

export default TermPage;
