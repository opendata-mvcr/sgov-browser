import { useQuery } from "react-query";
import {
  encodeNormalizedName,
  generateTermRoute,
  getNamespaceUri,
} from "../utils/Utils";
import { API } from "../app/variables";
import axios from "axios";
import _ from "lodash";

export const getVocabulary = async (vocabularyUri: string) => {
  const vocabulary = encodeNormalizedName(vocabularyUri);
  const namespace = getNamespaceUri(vocabularyUri);
  const route = `${API}/public/vocabularies/${vocabulary}`;
  const { data } = await axios.get(route, {
    params: { namespace: namespace },
  });
  return data;
};

export const useVocabulary = (vocabularyUri: string) => {
  return useQuery(
    ["vocabulary", vocabularyUri],
    () => getVocabulary(vocabularyUri),
    {
      enabled: !!vocabularyUri,
    }
  );
};

export const useVocabularyTerms = (vocabularyUri: string) => {
  return useQuery(
    ["vocabularyTerms", vocabularyUri],
    () => getVocabularyTerms(vocabularyUri),
    {
      enabled: !!vocabularyUri,
      retry: false,
    }
  );
};

export const getVocabularyTerms = async (vocabularyUri: string) => {
  const vocabulary = encodeNormalizedName(vocabularyUri);
  const namespace = getNamespaceUri(vocabularyUri);
  const route = `${API}/public/vocabularies/${vocabulary}/terms`;
  const { data } = await axios.get(route, {
    params: { namespace: namespace },
  });
  const result = _(data)
    .map((item) => {
      return {
        uri: item.uri,
        label: { cs: item.label.cs },
        vocabulary: item.vocabulary,
        route: generateTermRoute({
          vocabulary: item.vocabulary,
          uri: item.uri,
        }),
      };
    })
    .value();
  return result;
};
