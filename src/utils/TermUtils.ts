import { TermInterface } from "../api/data/terms";

//Checks whether term consists only of information which is displayed in the header (TermPage)
export const isTermEmpty = (term: TermInterface) => {
  return (
    !term.parentTerms.length &&
    !term.subTerms.length &&
    !term.definition &&
    !term.source
  );
};
