import { useQuery } from "react-query";
import { firstValueFrom } from "rxjs";
import {
  getVocabularyTermsQuery,
  Vocabularies,
  VocabularyTerms,
} from "./data/vocabularies";

export const getVocabulary = async (vocabularyIri: string) => {
  const data = await firstValueFrom(Vocabularies.findByIris([vocabularyIri]));

  if (data.length < 1) {
    // Vocabulary not found
    throw new Error("404 Vocabulary not found");
  }

  const item = data[0];

  return {
    "@id": item["@id"],
    "@type": item["@type"],
    label: item.label,
    description: item.description,
  };
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
      notifyOnChangeProps: ["data", "isError"],
    }
  );
};
