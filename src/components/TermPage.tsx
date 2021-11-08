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
  const { data, isLoading, isSuccess } = useTerm(term.uri);

  // Unfortunately we need to fetch array because of React Query
  const termData = data && data.length > 0 ? data[0] : undefined;

  if (isLoading) return <Loader />;

  if (!termData) {
    // TODO: cover the case when data is null, but the query is success -> nice 404 error page
    return null;
  }

  if (isSuccess) {
    return (
      <Box mb={2}>
        <TermHeader term={termData} />
        <TermDefinition term={termData} />
        <Hierarchy term={termData} />
      </Box>
    );
  }
  return <NoResults />;
};

export default TermPage;
