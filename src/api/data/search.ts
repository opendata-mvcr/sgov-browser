import { SchemaInterface, createResource } from "@ldkit/core";
import { xsd, skos, dcterms, ldkit } from "@ldkit/namespaces";
import { namedNode as n, literal as l } from "@ldkit/rdf";
import { $ } from "@ldkit/sparql";
import { lucene, luceneInstance, popisDat } from "./namespaces";
import { context } from "./context";

const VocabularySchema = {
  "@type": skos.Concept,
  title: dcterms.title,
};

const SearchSchema = {
  "@type": skos.Concept,
  label: skos.prefLabel,
  definition: {
    "@id": skos.definition,
    "@optional": true,
  },
  vocabulary: {
    "@id": popisDat["je-pojmem-ze-slovníku"],
    "@context": VocabularySchema,
  },
  snippetField: lucene.snippetField,
  snippetText: lucene.snippetText,
  score: {
    "@id": lucene.score,
    "@type": xsd.double,
  },
} as const;

export type SearchInterface = SchemaInterface<typeof SearchSchema>;

export const SearchResource = createResource(SearchSchema, context);

// Search query utils
const getWildcardString = (text: string) => {
  if (text.endsWith("*")) {
    return text;
  }
  const tokens = text.split(/\s+/);
  const lastToken = text.split(/\s+/).slice(-1);
  return `${tokens.join(" ")} ${lastToken}*`;
};

const getExactMatchString = (text: string) => {
  return `<em>${text.replaceAll(/\s+/g, "</em> <em>")}</em>`;
};

export const getSearchQuery = (text: string) => {
  // append asterisk for partial matching in Lucene index
  const wildcardString = getWildcardString(text);
  // wrap words with <em> tags for exact matching in Lucene index
  const exactMatchString = getExactMatchString(text);

  const query = $`
CONSTRUCT {
  ?entity a ${n(skos.Concept)} , ${n(ldkit.Resource)} ;
          ${n(skos.prefLabel)} ?label ;
          ${n(skos.definition)} ?definition ;
          ${n(popisDat["je-pojmem-ze-slovníku"])} ?vocabulary ;
          ${n(lucene.snippetText)} ?snippetText ;
          ${n(lucene.snippetField)} ?snippetField ;
          ${n(lucene.score)} ?score .
  ?vocabulary ${n(dcterms.title)} ?vocabularyTitle .
} WHERE {
  SELECT DISTINCT ?entity ?label ?definition ?vocabulary ?vocabularyTitle ?snippetField ?snippetText ?score {
    { ?search a ${n(luceneInstance.label_index)} } 
    UNION 
    { ?search a ${n(luceneInstance.defcom_index)} }
    ?search ${n(lucene.query)} ${l(wildcardString)} ;
            ${n(lucene.snippetSize)} 100 ;
            ${n(lucene.entities)} ?entity . 
    GRAPH ?g {
      ?entity a ${n(skos.Concept)} ;
              ${n(skos.prefLabel)} ?label .
    }
    ?entity ${n(popisDat["je-pojmem-ze-slovníku"])} ?vocabulary .
    ?vocabulary ${n(dcterms.title)} ?vocabularyTitle .
    OPTIONAL { ?entity ${n(skos.definition)} ?definition . }
    ?entity ${n(lucene.score)} ?initScore ;
            ${n(lucene.snippets)} _:s .
    _:s ${n(lucene.snippetText)} ?snippetText ;
        ${n(lucene.snippetField)} ?snippetField .
    FILTER (lang(?label) = "cs")
    BIND(IF(lcase(str(?snippetText)) = lcase(str(${l(
      exactMatchString
    )})), ?initScore * 2, IF(CONTAINS(lcase(str(?snippetText)), ${l(
    text
  )}), IF(?snippetField = "label", ?initScore * 1.5, ?initScore), ?initScore)) as ?exactMatchScore)
    BIND(IF(?snippetField = "label", ?exactMatchScore * 2, IF(?snippetField = "definition", ?exactMatchScore * 1.2, ?exactMatchScore)) as ?score)
  }
  ORDER BY desc(?score)
  LIMIT 100
}
`.toString();

  return query;
};

//Even though, this method might look very similar to the method above
//I think it is better to have them separated => more control over scoring and we ensure the required data type very easily
export const getVocabularySearchQuery = (text: string) => {
  const wildcardString = getWildcardString(text);
  const exactMatchString = getExactMatchString(text);

  const query = $`
CONSTRUCT {
  ?entity a ${n(popisDat["slovník"])} , ${n(ldkit.Resource)} ;
          ${n(dcterms.title)} ?label ;
          ${n(dcterms.description)} ?definition ;
          ${n(lucene.snippetText)} ?snippetText ;
          ${n(lucene.snippetField)} ?snippetField ;
          ${n(lucene.score)} ?score .
} WHERE {
  SELECT DISTINCT ?entity ?label ?definition ?snippetField ?snippetText ?score {
    { ?search a ${n(luceneInstance.label_index)} } 
    UNION 
    { ?search a ${n(luceneInstance.defcom_index)} }
    ?search ${n(lucene.query)} ${l(wildcardString)} ;
            ${n(lucene.snippetSize)} 100 ;
            ${n(lucene.entities)} ?entity . 
    GRAPH ?g {
      ?entity a ${n(popisDat["slovník"])} ;
              ${n(dcterms.title)} ?label .
    }
    OPTIONAL { ?entity ${n(dcterms.description)} ?definition . }
    ?entity ${n(lucene.score)} ?initScore ;
            ${n(lucene.snippets)} _:s .
    _:s ${n(lucene.snippetText)} ?snippetText ;
        ${n(lucene.snippetField)} ?snippetField .
    FILTER (lang(?label) = "cs")
    BIND(IF(lcase(str(?snippetText)) = lcase(str(${l(
      exactMatchString
    )})), ?initScore * 2, IF(CONTAINS(lcase(str(?snippetText)), ${l(
    text
  )}), IF(?snippetField = "title", ?initScore * 1.5, ?initScore), ?initScore)) as ?exactMatchScore)
    BIND(IF(?snippetField = "title", ?exactMatchScore * 2, IF(?snippetField = "description", ?exactMatchScore * 1.2, ?exactMatchScore)) as ?score)
  }
  ORDER BY desc(?score)
  LIMIT 100
}
`.toString();

  return query;
};
