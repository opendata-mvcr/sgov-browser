import React from "react";
import { Typography } from "@material-ui/core";
import DetailPageHeader from "./DetailPageHeader";
import { useVocabularyTerms } from "../api/VocabularyAPI";

interface DetailVocabularyHeaderProps {
  data: {
    label: string;
    uri: string;
  };
}

const VocabularyHeader: React.FC<DetailVocabularyHeaderProps> = (props) => {
  //TermIt uses HEAD method (X-COUNT header), IPR endpoint doesn't have this property in Headers
  const { data = [], isLoading } = useVocabularyTerms(props.data.uri);
  const above = (
    <Typography variant="h5" color="textSecondary">
      {isLoading ? "Načítání" : `${data.length} pojmů`}
    </Typography>
  );
  const label = props.data.label;
  const iri = props.data.uri;

  return <DetailPageHeader aboveLabel={above} label={label} iri={iri} />;
};
export default VocabularyHeader;
