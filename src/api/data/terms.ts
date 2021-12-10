import { createResource, SchemaInterface } from "@ldkit/core";
import { dcterms, ldkit, skos } from "@ldkit/namespaces";

import { context } from "./context";
import {owl, popisDat, rdfs, zSgovPojem} from "./namespaces";
import { $ } from "@ldkit/sparql";
import { namedNode as n } from "@ldkit/rdf";

export const TermBaseSchema = {
  "@type": skos.Concept,
  label: skos.prefLabel,
  vocabulary: {
    "@id": popisDat["je-pojmem-ze-slovníku"],
    "@context": {
      "@type": popisDat["slovník"],
      label: {
        "@id": dcterms.title,
        "@optional": true,
      },
    },
  },
  definition: {
    "@id": skos.definition,
    "@optional": true,
  },
} as const;

const TermSchema = {
  ...TermBaseSchema,
  altLabels: {
    "@id": skos.altLabel,
    "@optional": true,
    "@array": true,
  },
  source: {
    "@id": dcterms.source,
    "@optional": true,
  },
  parentTerms: {
    "@id": skos.broader,
    "@optional": true,
    "@array": true,
    "@context": TermBaseSchema,
  },
  subTerms: {
    "@id": skos.narrower,
    "@optional": true,
    "@array": true,
    "@context": TermBaseSchema,
  },
} as const;

export type TermInterface = SchemaInterface<typeof TermSchema>;

export type TermBaseInterface = SchemaInterface<typeof TermBaseSchema>;

export const Terms = createResource(TermSchema, context);

export const getTermRelationsQuery = (termIri: string) => {
  const query = $`
CONSTRUCT{ 
  ?domain ${n(rdfs.domain)} ?term .
  ?range ${n(rdfs.range)} ?term .
}
WHERE {
  BIND(${n(termIri)} as ?term)
  {
    ?domain ${n(rdfs.subClassOf)} ?domainRestriction . 
    ?domainRestriction ${n(owl.someValuesFrom)} ?term ; ${n(owl.onProperty)} ${n(zSgovPojem["má-vztažený-prvek-1"])} .
  }
  UNION{
    ?domain ${n(rdfs.domain)} ?term .
  }
  UNION {
    ?range ${n(rdfs.range)} ?term .
  }
  UNION {
    ?range ${n(rdfs.subClassOf)} ?rangeRestriction . 
    ?rangeRestriction ${n(owl.someValuesFrom)} ?term ; ${n(owl.onProperty)} ${n(zSgovPojem["má-vztažený-prvek-2"])} .
  }
}
  `.toString();

  return query;
};
