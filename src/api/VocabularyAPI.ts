import { useQuery } from "react-query";
import {
  encodeNormalizedName,
  generateTermRoute,
  getNamespaceUri,
} from "../utils/Utils";
import { API } from "../app/variables";
import axios from "axios";
import _ from "lodash";
import { firstValueFrom } from "rxjs";
import { Vocabularies } from "./data/vocabularies";

export const getVocabulary = async (vocabularyIri: string) => {
  const data = await firstValueFrom(Vocabularies.findByIris([vocabularyIri]));

  return data;
};

export const useVocabulary = (vocabularyUri: string) => {
  return useQuery(
    ["vocabulary", vocabularyUri],
    () => getVocabulary(vocabularyUri),
    {
      enabled: !!vocabularyUri,
      notifyOnChangeProps: ["data"] as "data"[],
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
