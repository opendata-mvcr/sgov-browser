import { useQuery } from "react-query";
import { firstValueFrom } from "rxjs";
import {
  getVocabularyTermsQuery,
  Vocabularies,
  VocabularyTerms,
} from "./data/vocabularies";

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

const getVocabularyTerms = async (vocabularyIri: string) => {
  const dynamicData = await firstValueFrom(
    VocabularyTerms.query(getVocabularyTermsQuery(vocabularyIri))
  );

  // Materialize data to actual JS objects so that we can manipulate it with lodash
  const data = dynamicData
    .map((item) => ({
      "@id": item["@id"],
      "@type": item["@type"],
      label: item.label,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return data;
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
