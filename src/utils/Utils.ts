import { TermBase } from "../api/TermAPI";

export const getVocabularyFromTermIri = (iri: string) => {
  const indexSentinel = iri.indexOf("/pojem");
  return iri.substr(0, indexSentinel);
};

export const generateTermBase = (iri: string): TermBase => {
  const vocabularyIri = getVocabularyFromTermIri(iri);
  return { $id: iri, vocabulary: { $id: vocabularyIri } };
};

export const generateTermRoute = (term: TermBase) => {
  return `/pojem?iri=${term.$id}`;
};

export const generateVocabularyRoute = (vocabularyUri: string) => {
  return `/slovnik?iri=${vocabularyUri}`;
};
