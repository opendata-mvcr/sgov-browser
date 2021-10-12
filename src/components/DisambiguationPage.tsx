import React, { useEffect, useState } from "react";
import useRouteQuery from "../hooks/useRouteQuery";
import { useSearch } from "../api/WordsAPI";
import _ from "lodash";
import { Box, Container, Typography } from "@material-ui/core";
import { SearchItem, SearchTerm } from "./SearchResult";
import TermResult from "./TermResult";
import Loader from "./Loader";
import usePrefetchTerms from "../hooks/usePrefetchTerms";

const DisambiguationPage: React.FC = () => {
  const routeQuery = useRouteQuery();
  const wordLabel = routeQuery.get("label");
  const {
    data = [],
    isSuccess,
    isLoading,
    isError,
  } = useSearch(wordLabel ?? undefined);

  const [terms, setTerms] = useState<SearchTerm[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const item = _.find<SearchItem>(data, { label: wordLabel ?? "" });
      if (item) {
        setTerms(item.items);
      }
    }
  }, [data, isSuccess, wordLabel]);

  if (isLoading) return <Loader />;

  if (isError) return <Typography variant="h1">Error occurred</Typography>;

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box bgcolor="primary.main" pb={1}>
        <Container>
          <Box px={5}>
            <Typography variant="h5" color="textSecondary">
              slovo
            </Typography>
            <Typography variant="h1" color="textSecondary">
              {wordLabel ?? ""}
            </Typography>
          </Box>
        </Container>
      </Box>
      <WordContent terms={terms} />
    </Box>
  );
};

interface WordContentProps {
  terms: SearchTerm[];
}

const WordContent: React.FC<WordContentProps> = (props) => {

  const isLoading = usePrefetchTerms(props.terms);
  if (isLoading) return <Loader />;
  return (
    <Container>
      <Box pt={2} pb={4}>
        {props.terms.map((term: SearchTerm) => {
          return (
            <TermResult
              key={term.uri}
              uri={term.uri}
              vocabulary={term.vocabulary}
              label={term.label}
            />
          );
        })}
      </Box>
    </Container>
  );
};
export default DisambiguationPage;
