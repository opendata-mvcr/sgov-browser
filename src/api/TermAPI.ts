import { useQuery } from "react-query";
import { firstValueFrom } from "rxjs";

import { TermBaseInterface, Terms } from "./data/terms";

// This is a supertype of TermBaseInterface containing term id and vocabulary id
export type TermBase = Pick<TermBaseInterface, "$id"> & {
  vocabulary: Pick<TermBaseInterface["vocabulary"], "$id">;
};

export const getTerm = async (termIri: string) => {
  const data = await firstValueFrom(Terms.findByIri(termIri));

  if (!data) {
    // Term not found
    throw new Error("404 Term not found");
  }

  return data;
};

export const useTerm = (termIri: string) => {
  return useQuery(["term", termIri], () => getTerm(termIri), {
    enabled: !!termIri,
    notifyOnChangeProps: ["data", "isError"],
  });
};
