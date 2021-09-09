import React, { useEffect, useState } from "react";
import useRouteQuery from "../hooks/useRouteQuery";
import { useSearch } from "../api/WordsAPI";
import _ from "lodash";
import { Box, Container, Typography } from "@material-ui/core";
import SearchResult, { SearchItem, SearchTerm } from "./SearchResult";
import { useHistory } from "react-router-dom";
import { getTerm, useTerm } from "../api/TermAPI";
import DefinitionSnippet from "./DefinitionSnippet";
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
  const history = useHistory();

  //Redirects when label isn't a word
  useEffect(() => {
    if (isSuccess) {
      const item = _.find<SearchItem>(data, { label: wordLabel ?? "" });
      if (item === undefined) {
        history.replace(`/search?label=${wordLabel}`);
      } else if (!item.isWord) {
        history.replace(`/search?label=${item.label}`);
      } else {
        setTerms(item.items);
      }
    }
  }, [data, isSuccess, wordLabel, history]);

  const handleClick = (term: SearchTerm) => {
    // TODO: get rid off this callBack and make it work via hrefs instead
    history.push("/term");
  };

  if (isLoading) return <Typography variant="h1">Loading...</Typography>;

  if (isError) return <Typography variant="h1">Error occurred</Typography>;

  return (
    <Box>
      <Box bgcolor="primary.main" pl={9} pb={1}>
        <Container>
          <Typography variant="body1" color="textSecondary">
            {terms.length}
            {terms.length > 4 ? " pojmů" : " pojmy"}
          </Typography>
          <Typography variant="h1" color="textSecondary">
            {wordLabel}
          </Typography>
        </Container>
      </Box>
      <Box pl={6} pt={2} pb={4}>
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
    </Box>
  );
};

export default DisambiguationPage;
