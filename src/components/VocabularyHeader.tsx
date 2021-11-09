import React from "react";
import { Typography } from "@material-ui/core";
import DetailPageHeader from "./DetailPageHeader";
import { useVocabularyTerms } from "../api/VocabularyAPI";
import { VocabularyInterface } from "../api/data/vocabularies";

const countHelper = (length: number) => {
  if (length === 1) return "pojem";
  else if (length <= 4) return "pojmy";
  else return "pojmů";
};

interface DetailVocabularyHeaderProps {
  vocabulary: VocabularyInterface;
}

const VocabularyHeader: React.FC<DetailVocabularyHeaderProps> = ({
  vocabulary,
}) => {
  const { data = [], isLoading } = useVocabularyTerms(vocabulary["@id"]);
  const above = (
    <Typography variant="h5" color="textSecondary">
      {isLoading
        ? "Načítání pojmů"
        : `${data.length} ${countHelper(data.length)}`}
    </Typography>
  );

  return (
    <DetailPageHeader
      aboveLabel={above}
      label={vocabulary.label}
      iri={vocabulary["@id"]}
    />
  );
};

export default VocabularyHeader;
