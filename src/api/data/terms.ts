import { createResource, SchemaInterface } from "@ldkit/core";
import { dcterms, skos } from "@ldkit/namespaces";

import { context } from "./context";
import { popisDat } from "./namespaces";

const TermBaseSchema = {
  "@type": skos.Concept,
  label: skos.prefLabel,
  vocabulary: {
    "@id": popisDat["je-pojmem-ze-slovníku"],
    "@context": {
      "@type": popisDat["slovník"],
      label: {
        "@id": dcterms.title,
        "@meta": ["@optional"],
      },
    },
  },
  definition: {
    "@id": skos.definition,
    "@meta": "@optional",
  },
} as const;

const TermSchema = {
  ...TermBaseSchema,
  altLabels: {
    "@id": skos.altLabel,
    "@meta": ["@array", "@optional"],
  },
  source: {
    "@id": dcterms.source,
    "@meta": ["@optional"],
  },
  parentTerms: {
    "@id": skos.broader,
    "@meta": ["@array", "@optional"],
    "@context": TermBaseSchema,
  },
  subTerms: {
    "@id": skos.narrower,
    "@meta": ["@array", "@optional"],
    "@context": TermBaseSchema,
  },
} as const;

export type TermInterface = SchemaInterface<typeof TermSchema>;

export type TermBaseInterface = SchemaInterface<typeof TermBaseSchema>;

export const Terms = createResource(TermSchema, context);
