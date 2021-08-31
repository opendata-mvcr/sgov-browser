import axios from "axios";
import { useQuery } from "react-query";
import _ from "lodash";
import { API } from "../app/variables";

const getSearchResult = async (word: string | undefined) => {
  const { data } = await axios.get(`${API}/search/fts`, {
    params: { searchString: word },
  });

  // Groups results with the same label, adds all individual scores and sort the final result
  const result = _(data)
    .groupBy("label")
    .map((objs, key) => ({
      label: key,
      total_score: _.sumBy(objs, "score"),
      items: { ...objs },
      isWord: objs.length !== 1,
    }))
    .orderBy("total_score", "desc")
    .value();

  return result;
};

export const useSearch = (word: string | undefined) => {
  return useQuery(["search", word], () => getSearchResult(word), {
    enabled: !!word,
  });
};
