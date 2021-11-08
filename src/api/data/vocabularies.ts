import { createResource, SchemaInterface } from "@ldkit/core";
import { dcterms } from "@ldkit/namespaces";

import { context } from "./context";
import { popisDat } from "./namespaces";
import { TermBaseSchema } from "./terms";

const VocabularyTermSchema = {
  "@type": TermBaseSchema["@type"],
  label: TermBaseSchema.label,
} as const;

const VocabularySchema = {
  "@type": popisDat["slovník"],
  label: {
    "@id": dcterms.title,
  },
  description: {
    "@id": dcterms.description,
    "@meta": ["@optional"],
  },
  terms: {
    "@id": popisDat["obsahuje-pojem"],
    "@context": VocabularyTermSchema,
    "@meta": ["@optional", "@array"],
  },
} as const;

export type VocabularyInterface = SchemaInterface<typeof VocabularySchema>;

export const Vocabularies = createResource(VocabularySchema, context);
