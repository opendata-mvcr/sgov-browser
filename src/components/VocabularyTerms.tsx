import React from "react";
import { useVocabularyTerms } from "../api/VocabularyAPI";
import Loader from "./Loader";
import VocabularyTermsList from "./VocabularyTermsList";
import { DetailItemWrapper } from "./Hierarchy";
import { Typography } from "@material-ui/core";

interface UriItem {
  uri: string;
}

const VocabularyTerms: React.FC<UriItem> = (props) => {
  const { data = [], isLoading, isError } = useVocabularyTerms(props.uri);

  if (isError || isLoading) {
    return (
      <DetailItemWrapper title={"Pojmy"}>
        {isLoading ? (
          <Loader size={50} variant="h5" />
        ) : (
          <Typography variant="h6">Při načítání pojmů došlo k chybě</Typography>
        )}
      </DetailItemWrapper>
    );
  }

 return <VocabularyTermsList terms={data} />;
};

export default VocabularyTerms;
