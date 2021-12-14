import React from "react";
import { useVocabularyTerms } from "../../api/VocabularyAPI";
import Loader from "../Loader";
import { DetailItemWrapper } from "../terms/Hierarchy";
import { Typography } from "@mui/material";
import VocabularyTermsListWindow from "./VocabularyTermsListWindow";

interface VocabularyTermsProps {
  vocabularyIri: string;
}

const VocabularyTerms: React.FC<VocabularyTermsProps> = ({ vocabularyIri }) => {
  const { data = [], isLoading, isError } = useVocabularyTerms(vocabularyIri);

  if (isError || isLoading) {
    return (
      <DetailItemWrapper title={"Pojmy"}>
        {isLoading ? (
          <Loader size={50} variant="h5" />
        ) : (
          <Typography variant="h6">Při načítání pojmů došlo k chybě</Typography>
        )}
      </DetailItemWrapper>
    );
  }
  return (
    <VocabularyTermsListWindow vocabularyIri={vocabularyIri} terms={data} />
  );
};

export default VocabularyTerms;
