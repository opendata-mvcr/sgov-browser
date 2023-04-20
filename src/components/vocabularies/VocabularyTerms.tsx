import React from "react";
import { useVocabularyTerms } from "../../api/VocabularyAPI";
import Loader from "../Loader";
import { Typography } from "@mui/material";
import VocabularyAndTermsListWindow from "./VocabularyAndTermsListWindow";
import DetailItemWrapper from "../detail_common/DetailItemWrapper";
import { generateTermRoute } from "../../utils/Utils";

interface VocabularyTermsProps {
  vocabularyIri: string;
}

const VocabularyTerms: React.FC<VocabularyTermsProps> = ({ vocabularyIri }) => {
  const { data = [], isLoading, isError } = useVocabularyTerms(vocabularyIri);

  const getTermRoute = (id: string) => {
    return generateTermRoute({
      $id: id,
      vocabulary: { $id: vocabularyIri },
    });
  };

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
    <VocabularyAndTermsListWindow
      routeResolver={getTermRoute}
      data={data}
      listLabel={"Pojmy"}
      searchHelperText={"Zadejte hledaný pojem"}
    />
  );
};

export default VocabularyTerms;
