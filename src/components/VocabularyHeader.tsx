import React from "react";
import { Typography } from "@material-ui/core";
import DetailPageHeader from "./DetailPageHeader";

interface DetailVocabularyHeaderProps {
  data: {
    label: string;
    uri: string;
  };
}

const VocabularyHeader: React.FC<DetailVocabularyHeaderProps> = (props) => {
  const above = (
    <Typography variant="h5" color="textSecondary">
      XX pojmů
    </Typography>
  );
  const label = props.data.label;
  const iri = props.data.uri;

  return <DetailPageHeader aboveLabel={above} label={label} iri={iri} />;
};
export default VocabularyHeader;
