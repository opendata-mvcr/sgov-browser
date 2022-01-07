import React from "react";
import AltLabel from "../detail_common/AltLabel";
import DetailPageHeader from "../detail_common/DetailPageHeader";
import RouteLink from "../RouteLink";
import { generateVocabularyRoute } from "../../utils/Utils";
import { TermInterface } from "../../api/data/terms";

export interface DetailHeaderProps {
  term: TermInterface;
}

const TermHeader: React.FC<DetailHeaderProps> = ({ term }) => {
  const { $id, label, altLabels, vocabulary } = term;

  const vocabularyRoute = generateVocabularyRoute(vocabulary.$id);
  const above = (
    <RouteLink to={vocabularyRoute} variant="h5" color="textSecondary">
      {vocabulary.label || vocabulary.$id}
    </RouteLink>
  );
  const below = <AltLabel altLabels={altLabels} />;

  return (
    <DetailPageHeader
      aboveLabel={above}
      label={label}
      belowLabel={below}
      iri={$id}
    />
  );
};

export default TermHeader;
