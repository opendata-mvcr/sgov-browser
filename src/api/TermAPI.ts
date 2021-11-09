import { useQuery } from "react-query";
import { firstValueFrom } from "rxjs";

import { TermBaseInterface, Terms } from "./data/terms";

// TODO: remove this interface / move it somewhere else
export interface TermBase {
  uri: string;
  vocabulary: string;
}

const materializeVocabulary = (
  vocabulary: TermBaseInterface["vocabulary"]
): TermBaseInterface["vocabulary"] => ({
  "@id": vocabulary["@id"],
  "@type": vocabulary["@type"],
  label: vocabulary.label,
});

const materializeTerm = (term: TermBaseInterface): TermBaseInterface => ({
  "@id": term["@id"],
  "@type": term["@type"],
  label: term.label,
  definition: term.definition,
  vocabulary: materializeVocabulary(term.vocabulary),
});

export const getTerm = async (termIri: string) => {
  const data = await firstValueFrom(Terms.findByIris([termIri]));

  if (data.length < 1) {
    // Term not found
    throw new Error("404 Term not found");
  }

  const item = data[0];

  // Materialize data to actual JS objects for React Query support
  return {
    "@id": item["@id"],
    "@type": item["@type"],
    label: item.label,
    altLabels: item.altLabels,
    definition: item.definition,
    source: item.source,
    parentTerms: item.parentTerms.map(materializeTerm),
    subTerms: item.subTerms.map(materializeTerm),
    vocabulary: materializeVocabulary(item.vocabulary),
  };
};

export const useTerm = (termIri: string) => {
  return useQuery(["term", termIri], () => getTerm(termIri), {
    enabled: !!termIri,
    notifyOnChangeProps: ["data", "isError"],
  });
};
