import React from "react";
import { useAllVocabularies } from "../../api/VocabularyAPI";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
import NoResults from "../search/NoResults";
import VocabularyAndTermsListWindow from "./VocabularyAndTermsListWindow";
import { generateVocabularyRoute } from "../../utils/Utils";

const VocabulariesPage: React.FC = () => {
  const { data, isLoading, isSuccess, isError } = useAllVocabularies();
  if (isLoading) return <Loader />;
  if (isError || !data) return <ErrorPage />;

  if (isSuccess) {
    return (
      <VocabularyAndTermsListWindow
        data={data}
        routeResolver={generateVocabularyRoute}
        listLabel={"Slovníky"}
        searchHelperText={"Zadejte hledaný slovník"}
      />
    );
  }
  return <NoResults />;
};

export default VocabulariesPage;
