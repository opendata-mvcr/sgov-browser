import axios from "axios";
import { useQuery } from "react-query";
import _ from "lodash";
import { API } from "../app/variables";

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
  });
};
