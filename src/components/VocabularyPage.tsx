import React from "react";
import useURLVocabulary from "../hooks/useURLVocabulary";
import { useVocabulary } from "../api/VocabularyAPI";
import Loader from "./Loader";
import { Box } from "@material-ui/core";
import NoResults from "./NoResults";
import VocabularyHeader from "./VocabularyHeader";

const VocabularyPage: React.FC = () => {
  const uri = useURLVocabulary();
  const { data = [], isLoading, isSuccess } = useVocabulary(uri ?? undefined);
  if (isLoading) return <Loader />;
  if (isSuccess) {
    return (
      <Box mb={10}>
        <VocabularyHeader data={data} />
      </Box>
    );
  }
  return <NoResults />;
};

export default VocabularyPage;
