import { useQuery } from "react-query";
import { firstValueFrom } from "rxjs";
import {
  getVocabularyTermsQuery,
  HIDDEN_VOCABULARY,
  Vocabularies,
  VocabularyTerms,
} from "./data/vocabularies";

export const getVocabulary = async (vocabularyIri: string) => {
  //If user is trying to fetch hidden vocabulary, immediately return null -> no retries from React Query
  if (vocabularyIri === HIDDEN_VOCABULARY) return null;

  const data = await firstValueFrom(Vocabularies.findByIri(vocabularyIri));

  if (!data) {
    // Vocabulary not found
    throw new Error("404 Vocabulary not found");
  }

  return data;
};

export const useVocabulary = (vocabularyUri: string) => {
  return useQuery(
    ["vocabulary", vocabularyUri],
    () => getVocabulary(vocabularyUri),
    {
      enabled: !!vocabularyUri,
      notifyOnChangeProps: ["data", "isError"],
    }
  );
};

const getVocabularyTerms = async (vocabularyIri: string) => {
  const data = await firstValueFrom(
    VocabularyTerms.query(getVocabularyTermsQuery(vocabularyIri))
  );

  data.sort((a, b) => a.label.localeCompare(b.label));
  return data;
};

export const useVocabularyTerms = (vocabularyUri: string) => {
  return useQuery(
    ["vocabularyTerms", vocabularyUri],
    () => getVocabularyTerms(vocabularyUri),
    {
      enabled: !!vocabularyUri,
      notifyOnChangeProps: ["data", "isError"],
    }
  );
};
