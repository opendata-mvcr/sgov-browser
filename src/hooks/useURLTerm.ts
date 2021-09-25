import { useParams } from "react-router-dom";
import useRouteQuery from "./useRouteQuery";
import { createTermUri } from "../utils/Utils";
import { TermBase } from "../api/TermAPI";

const useURLTerm = () => {
  const { vocabularyName, termName } =
    useParams<{ vocabularyName: string; termName: string }>();
  const query = useRouteQuery();
  const namespace = query.get("namespace") ?? "";
  //It is necessary to create the uri here (it is used for caching)
  const uri = createTermUri(vocabularyName, termName, namespace);
  const result: TermBase = {
    uri: uri,
    vocabulary: `${namespace}${vocabularyName}`,
  };

  return result;
};

export default useURLTerm;
