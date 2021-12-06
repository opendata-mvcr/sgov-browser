import { SearchResult } from "../api/WordsAPI";
import { skos } from "@ldkit/namespaces";
import { generateTermRoute, generateVocabularyRoute } from "./Utils";
import { popisDat } from "../api/data/namespaces";

export const generateRoute = (item: SearchResult) => {
  if (item.type.includes(skos.Concept)) return generateTermRoute(item.items[0]);
  if (item.type.includes(skos.Collection))
    return `/disambiguation?label=${item.label}`;
  if (item.type.includes(popisDat["slovník"]))
    return generateVocabularyRoute(item.vocabularies["id"]);
};
