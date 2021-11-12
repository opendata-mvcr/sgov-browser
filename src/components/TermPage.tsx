import React from "react";
import { Box } from "@material-ui/core";
import { useTerm } from "../api/TermAPI";
import NoResults from "./NoResults";
import TermHeader from "./TermHeader";
import TermDefinition from "./TermDefinition";
import { Hierarchy } from "./Hierarchy";
import useURLTerm from "../hooks/useURLTerm";
import Loader from "./Loader";
import ErrorPage from "./ErrorPage";
import EmptyTerm from "./EmptyTerm";

const TermPage: React.FC = () => {
  const term = useURLTerm();
  const { data, isLoading, isSuccess, isError } = useTerm(term.uri);

  if (isLoading) return <Loader />;

  if (isError || !data) return <ErrorPage />;

  if (isSuccess) {
    //Term is considered to be "empty" when no information is displayed apart from the header
    //TODO: Have some helper function which will map all of these. This is not really maintainable
    const emptyTerm =
      !data.parentTerms.length && !data.subTerms.length && !data.definition && !data.source;
    const content = emptyTerm ? (
      <EmptyTerm />
    ) : (
      <>
        <TermDefinition term={data} />
        <Hierarchy term={data} />
      </>
    );
    return (
      <Box>
        <TermHeader term={data} />
        {content}
      </Box>
    );
  }

  return <NoResults />;
};
export default TermPage;
