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

export const generateTermRoute = (term: TermBase) => {
  return `/vocabularies/${getNameFromUri(
    term.vocabulary
  )}/terms/${getNameFromUri(term.uri)}?namespace=${getNamespaceUri(
    term.vocabulary
  )}/`;
};
