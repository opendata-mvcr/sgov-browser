import { SearchTerm } from "../components/SearchResult";
import { useQueries, UseQueryResult } from "react-query";
import { getTerm } from "../api/TermAPI";

/**
 * This hook is for fetching multiple terms at once
 * It returns boolean whether all terms have been fetched or not
 * Its main purpose is to provide better loading experience for the user
 * Known issues = after stale time is reached, this hook forces re-renders for every term previously fetched.
 * Reason = useQueries modifies the isStale property => change of the object => re-render
 * **/
const usePrefetchTerms = (terms: SearchTerm[]) => {
  const queryResults: UseQueryResult[] = useQueries(
    terms?.map((term) => {
      return {
        queryKey: ["term", term.uri],
        queryFn: () => getTerm(term),
        enabled: !!term.uri,
      };
    })
  );
  return queryResults.some((query: UseQueryResult) => query.isLoading);
};
export default usePrefetchTerms;
