import React, { useEffect, useState } from "react";
import useRouteQuery from "../hooks/useRouteQuery";
import { useSearch } from "../api/WordsAPI";
import _ from "lodash";
import { Box, Container, Typography } from "@material-ui/core";
import { SearchItem, SearchTerm } from "./SearchResult";
import TermResult from "./TermResult";

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

  if (isLoading) return <Typography variant="h1">Loading...</Typography>;

  if (isError) return <Typography variant="h1">Error occurred</Typography>;

  return (
    <Box>
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
      <Container>
        <Box pt={2} pb={4}>
          {terms.map((term: SearchTerm) => {
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
    </Box>
  );
};

export default DisambiguationPage;
