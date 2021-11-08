import { useQuery } from "react-query";
import { firstValueFrom } from "rxjs";

import { Terms } from "./data/terms";

// TODO: remove this interface / move it somewhere else
export interface TermBase {
  uri: string;
  vocabulary: string;
}

export const getTerm = async (termIri: string) => {
  const data = await firstValueFrom(Terms.findByIris([termIri]));

  return data;
};

export const useTerm = (termIri: string) => {
  return useQuery(["term", termIri], () => getTerm(termIri), {
    enabled: !!termIri,
    notifyOnChangeProps: ["data"],
  });
};
