import React, { useEffect } from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { useSearch } from "../api/WordsAPI";
import useRouteQuery from "../hooks/useRouteQuery";
import _ from "lodash";
import SearchResult, { SearchItem } from "./SearchResult";
import SearchBar from "./SearchBar";
import { useHistory } from "react-router-dom";

const NUMBER_OF_RESULT = 50;

const SearchPage: React.FC = () => {
  const routeQuery = useRouteQuery();
  const wordLabel = routeQuery.get("label");
  const {
    data = [],
    isSuccess,
    isLoading,
    isError,
  } = useSearch(wordLabel ?? undefined);
  const history = useHistory();

  useEffect(() => {
    if (isSuccess) {
      const item = _.find<SearchItem>(data, { label: wordLabel ?? "" });
      if (item === undefined) {
        return;
      } else if (item.isWord) {
        history.replace(`/disambiguation?label=${item.label}`);
      } else {
        history.replace("/term");
      }
    }
  });

  const clickCallback = (item: SearchItem) => {
    if (item.isWord) {
      history.push(`/disambiguation?label=${item.label}`);
    } else {
      history.push("/term");
    }
  };

  // Just to show something, not a final version at all
  if (isLoading) return <Typography variant="h1">Loading...</Typography>;

  if (isError) return <Typography variant="h1">Error occurred</Typography>;

  return (
    <Box>
      <Box bgcolor="primary.main" py={2}>
        <Container>
          <SearchBar size="large" />
          <Box pl={6} pt={2}>
            <Typography variant="h5" color="textSecondary">
              Bohužel jsme nenalezli přesný význam slova "{wordLabel}"
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box pl={6} pt={2} pb={4}>
        {data.length ? (
          data.slice(0, NUMBER_OF_RESULT).map((item) => {
            return (
              <SearchResult
                key={item.label}
                label={item.label}
                isWord={item.isWord}
                items={item.items}
                vocabularies={item.vocabularies}
                click={() => clickCallback(item)}
              />
            );
          })
        ) : (
          <Typography variant="h2">Nebyly nalezené žádné výsledky</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
