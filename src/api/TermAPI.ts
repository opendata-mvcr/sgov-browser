import { API } from "../app/variables";
import { encodeNormalizedName, getNamespaceUri } from "../utils/Utils";
import axios from "axios";
import { useQuery } from "react-query";

export interface TermBase {
  uri: string;
  vocabulary: string;
}

export const getTerm = async (searchResult: TermBase) => {
  const vocabulary = encodeNormalizedName(searchResult.vocabulary);
  const term = encodeNormalizedName(searchResult.uri);
  const namespace = getNamespaceUri(searchResult.vocabulary);
  const route = `${API}/public/vocabularies/${vocabulary}/terms/${term}`;
  const { data } = await axios.get(route, {
    params: { namespace: namespace },
  });
  return data;
};

export const useTerm = (searchResult: TermBase) => {
  return useQuery(["term", searchResult.uri], () => getTerm(searchResult), {
    enabled: !!searchResult.uri,
    notifyOnChangeProps: ["data"],
  });
};
