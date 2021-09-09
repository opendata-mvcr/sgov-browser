import { SearchTerm } from "../components/SearchResult";
import { API } from "../app/variables";
import Utils from "../utils/Utils";
import axios from "axios";
import { useQuery } from "react-query";

export const getTerm = async (searchResult: SearchTerm) => {
  const vocabulary = Utils.encodeNormalizedName(searchResult.vocabulary);
  const term = Utils.encodeNormalizedName(searchResult.uri);
  const namespace = Utils.getNamespaceUri(searchResult.vocabulary);
  const route = `${API}/public/vocabularies/${vocabulary}/terms/${term}`;

  const { data } = await axios.get(route, {
    params: { namespace: namespace },
  });
  // TODO: Add interface
  return data;
};

export const useTerm = (searchResult: SearchTerm) => {
  return useQuery(["term", searchResult.uri], () => getTerm(searchResult), {
    enabled: !!searchResult.uri,
  });
};
