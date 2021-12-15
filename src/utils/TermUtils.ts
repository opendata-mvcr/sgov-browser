import { TermInterface } from "../api/data/terms";

//Checks whether term consists only of information which is displayed in the header (TermPage)
export const isTermEmpty = (term: TermInterface) => {
  //TODO: Relations issue: This absolutely needs to be rewritten to check if relations are present
  return (
    !term.parentTerms.length &&
    !term.subTerms.length &&
    !term.definition &&
    !term.source
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
