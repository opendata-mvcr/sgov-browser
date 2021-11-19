import { createResource, SchemaInterface } from "@ldkit/core";
import { dcterms, skos } from "@ldkit/namespaces";

import { context } from "./context";
import { popisDat } from "./namespaces";

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
