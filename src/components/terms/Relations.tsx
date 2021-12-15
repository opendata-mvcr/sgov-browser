import React from "react";
import { useRelations } from "../../api/TermAPI";
import Loader from "../Loader";
import { TermInterface } from "../../api/data/terms";
import DetailItemWrapper from "../detail_common/DetailItemWrapper";
import { owl } from "../../api/data/namespaces";
import TermRelations from "./TermRelations";
import PropertyRelations from "./PropertyRelations";

interface RelationsProperty {
  term: TermInterface;
}

const Relations: React.FC<RelationsProperty> = ({ term }) => {
  const { data, isLoading, isSuccess } = useRelations(term);
  if (isLoading) return <Loader />;

  if (!data) return null;

  if (isSuccess) {
    return (
      <DetailItemWrapper title="Vztahy">
        {term.$type.includes(owl.ObjectProperty) ? (
          <PropertyRelations relations={data} currentTerm={term}/>
        ) : (
          <TermRelations relations={data} currentTerm={term}/>
        )}
      </DetailItemWrapper>
    );
  }
  return <></>;
};
export default Relations;
