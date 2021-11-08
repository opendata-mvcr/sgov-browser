import { createNamespace } from "@ldkit/core";

export const popisDat = createNamespace({
  iri: "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/",
  prefix: "popisdat:",
  terms: ["je-pojmem-ze-slovníku", "slovník"],
} as const);

export const lucene = createNamespace({
  iri: "http://www.ontotext.com/connectors/lucene#",
  prefix: "lucene:",
  terms: [
    "query",
    "entities",
    "snippets",
    "snippetText",
    "snippetField",
    "snippetSize",
    "score",
  ],
} as const);

export const luceneInstance = createNamespace({
  iri: "http://www.ontotext.com/connectors/lucene/instance#",
  prefix: "luceneinstance:",
  terms: ["label_index", "defcom_index"],
} as const);
