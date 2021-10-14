import { TermBase } from "../api/TermAPI";

export const encodeNormalizedName = (uri: string) => {
  const index = uri.lastIndexOf("/") + 1;
  const name = uri.substr(index);
  return encodeURIComponent(name);
};

export const getNamespaceUri = (uri: string) => {
  const index = uri.lastIndexOf("/");
  return uri.substr(0, index);
};

export const getNameFromUri = (uri: string) => {
  const index = uri.lastIndexOf("/") + 1;
  return uri.substr(index);
};

export const createTermUri = (
  vocabulary: string,
  term: string,
  namespace: string
) => {
  return `${namespace}${vocabulary}/pojem/${term}`;
};

export const createVocabularyUri = (vocabulary: string, namespace: string) => {
  return `${namespace}${vocabulary}`;
};

export const generateTermRoute = (term: TermBase) => {
  //Exception is checked because some terms don't have vocabulary (don't know how is that possible)
  try {
    return `/vocabularies/${getNameFromUri(
      term.vocabulary
    )}/terms/${getNameFromUri(term.uri)}?namespace=${getNamespaceUri(
      term.vocabulary
    )}/`;
  } catch {
    return "/error";
  }
};

export const generateVocabularyRoute = (vocabularyUri: string) => {
  const name = getNameFromUri(vocabularyUri);
  const namespace = getNamespaceUri(vocabularyUri);
  return `/vocabularies/${name}?namespace=${namespace}/`
};
