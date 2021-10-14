import React from "react";
import AltLabel from "./AltLabel";
import IriLabel from "./IriLabel";
import DetailPageHeader from "./DetailPageHeader";

export interface DetailHeaderProps {
  data: {
    label: { cs: string };
    altLabels?: { cs?: string }[];
    uri: string;
    vocabulary: string;
  };
}

const TermHeader: React.FC<DetailHeaderProps> = (props) => {
  const label = props.data.label.cs;
  const altLabels = props.data.altLabels;
  const iri = props.data.uri;
  const vocabulary = props.data.vocabulary;

  const above = (
    <IriLabel iri={vocabulary} variant="h5" color="textSecondary" />
  );
  const below = <AltLabel altLabels={altLabels} />;

  return (
    <DetailPageHeader
      aboveLabel={above}
      label={label}
      belowLabel={below}
      iri={iri}
    />
  );
};

export default TermHeader;
