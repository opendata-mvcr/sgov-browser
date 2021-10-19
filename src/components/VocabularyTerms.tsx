import React from "react";
import { useVocabularyTerms } from "../api/VocabularyAPI";
import Loader from "./Loader";
import VocabularyTermsList from "./VocabularyTermsList";

interface UriItem {
  uri: string;
}

const VocabularyTerms: React.FC<UriItem> = (props) => {
  const { data = [], isLoading } = useVocabularyTerms(props.uri);
  if (isLoading) return <Loader />;
  return <VocabularyTermsList terms={data} />;
};

export default VocabularyTerms;
