import { SearchTerm } from "../components/SearchResult";
import { useQueries, UseQueryResult } from "react-query";
import { getTerm } from "../api/TermAPI";

const usePrefetchTerms = (terms: SearchTerm[]) => {
  const validTerms = terms.filter((item) => item.uri && item.vocabulary);
  const queryResults: UseQueryResult[] = useQueries(
    validTerms?.map((term) => {
      return {
        queryKey: ["term", term.uri],
        queryFn: () => getTerm(term),
        enabled: !!term.uri,
        notifyOnChangeProps: ["data"],
      };
    })
  );
  const isLoading = queryResults.some(
    (query: UseQueryResult) => query.isLoading
  );
  const amount = validTerms.length;
  return [isLoading, amount] as const;
};
export default usePrefetchTerms;
