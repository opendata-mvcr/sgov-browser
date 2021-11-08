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

  if (data.length < 1) {
    // Term not found
    throw new Error("404 Term not found");
  }

  const item = data[0];

  return {
    "@id": item["@id"],
    "@type": item["@type"],
    label: item.label,
    altLabels: item.altLabels,
    definition: item.definition,
    source: item.source,
    parentTerms: item.parentTerms,
    subTerms: item.subTerms,
    vocabulary: item.vocabulary,
  };
};

export const useTerm = (termIri: string) => {
  return useQuery(["term", termIri], () => getTerm(termIri), {
    enabled: !!termIri,
    notifyOnChangeProps: ["data", "isError"],
  });
};
