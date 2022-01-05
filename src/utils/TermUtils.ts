import { TermInterface } from "../api/data/terms";
import { owl, zSgovPojem } from "../api/data/namespaces";

//Checks whether term consists only of information which is displayed in the header (TermPage)
export const isTermEmpty = (term: TermInterface) => {
  return (
    !term.parentTerms.length &&
    !term.subTerms.length &&
    !term.definition &&
    !term.source
  );
};

//Useful for deciding which query to use
export const isProperty = (term: TermInterface) => {
  return (
    term.$type.includes(owl.ObjectProperty) ||
    term.$type.includes(zSgovPojem["typ-vztahu"]) ||
    term.$type.includes(zSgovPojem["typ-vlastnosti"])
  );
};

export const generateStyledSnippet = (
  snippetText: string,
  isMatchInDefinition: boolean
) => {
  if (!isMatchInDefinition) return "";
  // If snippet is shorter than defined lucene length, there is no need for the ellipses at the end
  return snippetText.length < 100
    ? `<i> - ${snippetText}</i>`
    : `<i> - ${snippetText}</i>&hellip;`;
};
