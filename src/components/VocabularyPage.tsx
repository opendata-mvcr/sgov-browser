import React from "react";
import useURLVocabulary from "../hooks/useURLVocabulary";
import { useVocabulary } from "../api/VocabularyAPI";
import Loader from "./Loader";
import { Box } from "@material-ui/core";
import NoResults from "./NoResults";
import VocabularyHeader from "./VocabularyHeader";
import VocabularyDefinition from "./VocabularyDefinition";
import VocabularyTerms from "./VocabularyTerms";

const VocabularyPage: React.FC = () => {
  const uri = useURLVocabulary();
  const { data = [], isLoading, isSuccess } = useVocabulary(uri ?? undefined);

  if (isLoading) return <Loader />;

  // Unfortunately we need to fetch array because of React Query
  const vocabularyData = data && data.length > 0 ? data[0] : undefined;

  if (!vocabularyData) {
    // TODO: cover the case when data is null, but the query is success -> nice 404 error page
    return null;
  }

  if (isSuccess) {
    return (
      <Box mb={2}>
        <VocabularyHeader vocabulary={vocabularyData} />
        <VocabularyDefinition description={vocabularyData.description} />
        <VocabularyTerms uri={vocabularyData["@id"]} />
      </Box>
    );
  }
  return <NoResults />;
};

export default VocabularyPage;
