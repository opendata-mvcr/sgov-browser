import { useParams } from "react-router-dom";
import useRouteQuery from "./useRouteQuery";
import { createVocabularyUri } from "../utils/Utils";

const useURLVocabulary = () => {
  const { vocabularyName } = useParams<{ vocabularyName: string }>();
  const query = useRouteQuery();
  const namespace = query.get("namespace") ?? "";
  const result = createVocabularyUri(vocabularyName, namespace);

  return result;
};

export default useURLVocabulary;
