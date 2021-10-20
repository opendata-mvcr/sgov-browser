import React from "react";
import { Typography } from "@material-ui/core";
import DetailPageHeader from "./DetailPageHeader";
import { useVocabularyTerms } from "../api/VocabularyAPI";

const countHelper = (length: number) => {
  if (length === 1) return "pojem";
  else if (length <= 4) return "pojmy";
  else return "pojmů";
};

interface DetailVocabularyHeaderProps {
  data: {
    label: string;
    uri: string;
  };
}

const VocabularyHeader: React.FC<DetailVocabularyHeaderProps> = (props) => {
  const { data = [], isLoading } = useVocabularyTerms(props.data.uri);
  const above = (
    <Typography variant="h5" color="textSecondary">
      {isLoading
        ? "Načítání pojmů"
        : `${data.length} ${countHelper(data.length)}`}
    </Typography>
  );
  const label = props.data.label;
  const iri = props.data.uri;

  return <DetailPageHeader aboveLabel={above} label={label} iri={iri} />;
};

export default VocabularyHeader;
