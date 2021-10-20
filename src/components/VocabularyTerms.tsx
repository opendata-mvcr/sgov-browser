import React from "react";
import { useVocabularyTerms } from "../api/VocabularyAPI";
import Loader from "./Loader";
import VocabularyTermsList from "./VocabularyTermsList";
import { DetailItemWrapper } from "./Hierarchy";

interface UriItem {
  uri: string;
}

const VocabularyTerms: React.FC<UriItem> = (props) => {
  const { data = [], isLoading } = useVocabularyTerms(props.uri);
  if (isLoading) {
    return (
      <DetailItemWrapper title={"Pojmy"}>
        <Loader size={50} variant="h4" />
      </DetailItemWrapper>
    );
  }
  return <VocabularyTermsList terms={data} />;
};

export default VocabularyTerms;
