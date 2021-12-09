import { useQuery } from "react-query";
import { firstValueFrom } from "rxjs";

import { TermBaseInterface, Terms } from "./data/terms";
import { HIDDEN_VOCABULARY } from "./data/vocabularies";

// This is a supertype of TermBaseInterface containing term id and vocabulary id
export type TermBase = Pick<TermBaseInterface, "$id"> & {
  vocabulary: Pick<TermBaseInterface["vocabulary"], "$id">;
};

export const getTerm = async (term: TermBase) => {
  //If user is trying to fetch term from hidden vocabulary, immediately return null -> no retries from React Query
  if (term.vocabulary.$id === HIDDEN_VOCABULARY) return null;

  const data = await firstValueFrom(Terms.findByIri(term.$id));

  if (!data) {
    // Term not found
    throw new Error("404 Term not found");
  }

  //Removes all mentions of terms coming from hidden vocabulary
  (data.parentTerms as TermBaseInterface[]) = data.parentTerms.filter(
    (term) => term.vocabulary.$id !== HIDDEN_VOCABULARY
  );
  (data.subTerms as TermBaseInterface[]) = data.subTerms.filter(
    (term) => term.vocabulary.$id !== HIDDEN_VOCABULARY
  );

  return data;
};

export const useTerm = (term: TermBase) => {
  return useQuery(["term", term.$id], () => getTerm(term), {
    enabled: !!term.$id,
    notifyOnChangeProps: ["data", "isError"],
  });
};
