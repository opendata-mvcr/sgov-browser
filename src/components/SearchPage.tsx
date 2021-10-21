import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { useSearch } from "../api/WordsAPI";
import useRouteQuery from "../hooks/useRouteQuery";
import SearchResult from "./SearchResult";
import NoResults from "./NoResults";
import Loader from "./Loader";
import LargeSearchBar from "./LargeSearchBar";
import NumberOfResults from "./NumberOfResults";

const NUMBER_OF_RESULT = 50;

const SearchPage: React.FC = () => {
  const routeQuery = useRouteQuery();
  const wordLabel = routeQuery.get("label");
  const { data = [], isLoading, isError } = useSearch(wordLabel ?? undefined);

  if (isLoading) return <Loader />;

  if (isError) return <Typography variant="h1">Error occurred</Typography>;
  return (
    <Box>
      <LargeSearchBar searchedText={wordLabel} />

      <Container>
        <Box pt={2} pb={4}>
          <NumberOfResults amount={data.length} />
          {data.length ? (
            data.slice(0, NUMBER_OF_RESULT).map((item) => {
              return (
                <SearchResult
                  key={item.label}
                  label={item.label}
                  isWord={item.isWord}
                  items={item.items}
                  vocabularies={item.vocabularies}
                />
              );
            })
          ) : (
            <NoResults />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SearchPage;
