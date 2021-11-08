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
  const data = await firstValueFrom(
    VocabularyTerms.query(getVocabularyTermsQuery(vocabularyIri))
  );

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
