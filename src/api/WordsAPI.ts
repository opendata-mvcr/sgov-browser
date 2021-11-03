import { useQuery } from "react-query";
import _ from "lodash";
import { firstValueFrom } from "rxjs";
import { getSearchQuery, SearchResource } from "./data/search";

const getSearchResults = async (word: string | undefined) => {
  if (!word) {
    return [];
  }
  const dynamicData = await firstValueFrom(
    SearchResource.query(getSearchQuery(word))
  );

  // Materialize data to actual JS objects so that we can manipulate it with lodash
  const data = dynamicData.map((item) => {
    const {
      "@id": uri,
      label,
      definition,
      vocabulary,
      vocabularyTitle,
      score,
      snippetField,
      snippetText,
    } = item;
    return {
      uri,
      label,
      definition,
      vocabulary,
      vocabularyTitle,
      score,
      snippetField,
      snippetText,
    };
  });

  // Groups results with the same label
  // adds isWord flag when there are multiple
  const result = _(data)
    .groupBy("label")
    .map((objs, key) => {
      return {
        label: key,
        // include text with highlighted search string, should be the same for all objects with the same label
        displayText:
          objs[0].snippetField === "label" ? objs[0].snippetText : key,
        total_score: _.maxBy(objs, "score")?.score,
        items: [...objs],
        isWord: objs.length !== 1,
        // vocabularies: _.map(_.uniqBy(objs, "vocabulary"), "vocabulary"),
        vocabularies: objs.reduce((map, item) => {
          map[item.vocabulary] = item.vocabularyTitle;
          return map;
        }, {} as Record<string, string>),
      };
    })
    .orderBy("total_score", "desc")
    .value();

  return result;
};

// Type of a search result object - terms are aggregated by label
export type SearchResult = ReturnType<typeof getSearchResults> extends Promise<
  (infer U)[]
>
  ? U
  : never;

// Type of a term object as returned by search query
export type SearchTerm = SearchResult["items"] extends (infer U)[] ? U : never;

export const useSearch = (word: string | undefined) => {
  return useQuery(["directsearch", word], () => getSearchResults(word), {
    enabled: !!word,
  });
};
