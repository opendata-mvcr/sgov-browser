import axios from "axios";
import { useQuery } from "react-query";
import _ from "lodash";
import { API } from "../app/variables";
import { firstValueFrom } from "rxjs";
import { getSearchQuery, SearchResource } from "./data/search";

const getSearchResult = async (word: string | undefined) => {
  const { data } = await axios.get(`${API}/search/fts`, {
    params: { searchString: word },
  });

  // Groups results with the same label, adds all individual scores and sort the final result
  // adds isWord flag when there are multiple, only label results are accepted
  const result = _(data)
    .filter((item) => {
      return item.snippetField === "label" && item.uri && item.vocabulary;
    })
    .groupBy("label")
    .map((objs, key) => {
      return {
        label: key,
        total_score: _.sumBy(objs, "score"),
        items: [...objs],
        isWord: objs.length !== 1,
        vocabularies: _.map(_.uniqBy(objs, "vocabulary"), "vocabulary"),
      };
    })
    .orderBy("total_score", "desc")
    .value();
  return result;
};

export const useSearch = (word: string | undefined) => {
  return useQuery(["search", word], () => getSearchResult(word), {
    enabled: !!word,
    notifyOnChangeProps: ["data"] as "data"[],
  });
};

const getDirectSearchResult = async (word: string | undefined) => {
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
      vocabulary,
      score,
      snippetField,
      snippetText,
    } = item;
    return {
      uri,
      label,
      vocabulary,
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
        vocabularies: _.map(_.uniqBy(objs, "vocabulary"), "vocabulary"),
      };
    })
    .orderBy("total_score", "desc")
    .value();

  return result;
};

export type DirectSearchResult = ReturnType<
  typeof getDirectSearchResult
> extends Promise<(infer U)[]>
  ? U
  : never;

export const useDirectSearch = (word: string | undefined) => {
  return useQuery(["directsearch", word], () => getDirectSearchResult(word), {
    enabled: !!word,
  });
};
