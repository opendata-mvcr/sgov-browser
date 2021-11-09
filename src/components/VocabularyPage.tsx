import React from "react";
import useURLVocabulary from "../hooks/useURLVocabulary";
import { useVocabulary } from "../api/VocabularyAPI";
import Loader from "./Loader";
import { Box } from "@material-ui/core";
import NoResults from "./NoResults";
import VocabularyHeader from "./VocabularyHeader";
import VocabularyDefinition from "./VocabularyDefinition";
import VocabularyTerms from "./VocabularyTerms";
import ErrorPage from "./ErrorPage";

const VocabularyPage: React.FC = () => {
  const uri = useURLVocabulary();
  const { data, isLoading, isSuccess, isError } = useVocabulary(uri);

  if (isLoading) return <Loader />;

  if (isError || !data) return <ErrorPage />;

  if (isSuccess) {
    return (
      <Box mb={2}>
        <VocabularyHeader vocabulary={data} />
        <VocabularyDefinition description={data.description} />
        <VocabularyTerms vocabularyIri={data["@id"]} />
      </Box>
    );
  }
  return <NoResults />;
};

export default VocabularyPage;
