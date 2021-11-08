import { createResource, SchemaInterface } from "@ldkit/core";
import { dcterms, skos } from "@ldkit/namespaces";
import { namedNode as n } from "@ldkit/rdf";
import { $ } from "@ldkit/sparql";

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

export type VocabularyTermInterface = SchemaInterface<
  typeof VocabularyTermSchema
>;

export const VocabularyTerms = createResource(VocabularyTermSchema, context);

export const getVocabularyTermsQuery = (vocabularyIri: string) => {
  const query = $`
  CONSTRUCT {
    ?iri a ${n(skos.Concept)} ;
      ${n(skos.prefLabel)} ?label ;
      ${n(skos.definition)} ?definition .
  }
  WHERE {
    ?iri a ${n(skos.Concept)} ;
      ${n(popisDat["je-pojmem-ze-slovníku"])} ${n(vocabularyIri)} ;
      ${n(skos.prefLabel)} ?label .
    OPTIONAL { ?iri ${n(skos.definition)} ?definition . }
  }
  `.toString();

  return query;
};
