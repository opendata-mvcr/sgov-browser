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
import RelationConnector from "./RelationConnector";

interface RelationsProperty {
  term: TermInterface;
}
//TODO: FIX if term is typ-vlastnosti
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

export const calculateConnector = (index: number, size: number) => {
  if (size === 1) {
    return <RelationConnector type="straight" />;
  }
  if (size > 1 && index === 0) {
    return <RelationConnector type="tline" />;
  }
  if (size > 1 && index + 1 !== size) {
    return <RelationConnector type="hline" />;
  }
  if (size > 1 && index + 1 === size) {
    return <RelationConnector type="lline" />;
  }
  return <></>;
};

export const calculateReverseConnector = (index: number, size: number) => {
  if (size === 1) {
    return <RelationConnector type="straight" />;
  }
  if (size > 1 && index === 0) {
    return <RelationConnector type="r_tline" />;
  }
  if (size > 1 && index + 1 !== size) {
    return <RelationConnector type="r_hline" />;
  }
  if (size > 1 && index + 1 === size) {
    return <RelationConnector type="r_lline" />;
  }
  return <></>;
};

export default Relations;
