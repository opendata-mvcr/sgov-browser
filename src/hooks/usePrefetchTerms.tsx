import { SearchTerm } from "../components/SearchResult";
import { useQueries, UseQueryResult } from "react-query";
import { getTerm } from "../api/TermAPI";

const usePrefetchTerms = (terms: SearchTerm[]) => {
  const queryResults: UseQueryResult[] = useQueries(
    terms?.map((term) => {
      return {
        queryKey: ["term", term.uri],
        queryFn: () => getTerm(term),
        enabled: !!term.uri,
        notifyOnChangeProps: ["data"],
      };
    })
  );
  return queryResults.some((query: UseQueryResult) => query.isLoading);
};
export default usePrefetchTerms;
