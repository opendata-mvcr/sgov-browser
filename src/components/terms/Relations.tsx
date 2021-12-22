import React from "react";
import { useRelations } from "../../api/TermAPI";
import Loader from "../Loader";
import { TermInterface } from "../../api/data/terms";
import DetailItemWrapper from "../detail_common/DetailItemWrapper";
import TermRelations from "./TermRelations";
import PropertyRelations from "./PropertyRelations";
import { isProperty, isTermEmpty } from "../../utils/TermUtils";
import EmptyTerm from "./EmptyTerm";
import { RelationItem } from "./RelationItem";

interface RelationsProperty {
  term: TermInterface;
}

const Relations: React.FC<RelationsProperty> = ({ term }) => {
  const { data, isLoading, isSuccess } = useRelations(term);
  if (isLoading) return <Loader />;

  if (isTermEmpty(term) && data?.length === 0) return <EmptyTerm />;
  if (data?.length === 0 || data === undefined) return null;

  if (isSuccess) {
    const ranges = data[0].range.map((item) => {
      return (
        <RelationItem
          data={item}
          showVocabulary={term.vocabulary.$id !== item.vocabulary.$id}
          key={item.$id}
        />
      );
    });

    const domains = data[0].domain.map((item) => {
      return (
        <RelationItem
          data={item}
          showVocabulary={term.vocabulary.$id !== item.vocabulary.$id}
          key={item.$id}
        />
      );
    });

    return (
      <DetailItemWrapper title="Vztahy">
        {isProperty(term) ? (
          <PropertyRelations
            domains={domains}
            ranges={ranges}
            currentTerm={term}
          />
        ) : (
          <TermRelations domains={domains} ranges={ranges} currentTerm={term} />
        )}
      </DetailItemWrapper>
    );
  }
  return null;
};

export default Relations;
