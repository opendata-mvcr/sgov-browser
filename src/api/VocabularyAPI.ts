import { useQuery } from "react-query";
import { encodeNormalizedName, getNamespaceUri } from "../utils/Utils";
import { API } from "../app/variables";
import axios from "axios";


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
      }
  );
}

export const getVocabularyTerms = async (vocabularyUri: string) => {
  const vocabulary = encodeNormalizedName(vocabularyUri);
  const namespace = getNamespaceUri(vocabularyUri);
  const route = `${API}/public/vocabularies/${vocabulary}/terms`;
  const { data } = await axios.get(route, {
    params: { namespace: namespace },
  });
  return data;
};