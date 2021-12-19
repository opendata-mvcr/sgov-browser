import React from "react";
import { Box } from "@mui/material";
import { useTerm } from "../../api/TermAPI";
import NoResults from "../search/NoResults";
import TermHeader from "./TermHeader";
import TermDefinition from "./TermDefinition";
import { Hierarchy } from "./Hierarchy";
import useURLTerm from "../../hooks/useURLTerm";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import Relations from "./Relations";

const TermPage: React.FC = () => {
  const term = useURLTerm();
  const { data, isLoading, isSuccess, isError } = useTerm(term);

  if (isLoading) return <Loader />;

  if (isError || !data) return <ErrorPage />;

  if (isSuccess) {
    return (
      <Box>
        <TermHeader term={data} />
        <TermDefinition term={data} />
        <Hierarchy term={data} />
        {/**Relations component checks if the term is empty, because it is the last one**/}
        <Relations term={data} />
      </Box>
    );
  }

  return <NoResults />;
};
export default TermPage;
