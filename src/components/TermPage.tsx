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
import EmptyTerm from "./EmptyTerm";
import { isTermEmpty } from "../utils/TermUtils";

const TermPage: React.FC = () => {
  const term = useURLTerm();
  const { data, isLoading, isSuccess, isError } = useTerm(term.$id);

  if (isLoading) return <Loader />;

  if (isError || !data) return <ErrorPage />;

  if (isSuccess) {
    const content = isTermEmpty(data) ? (
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
