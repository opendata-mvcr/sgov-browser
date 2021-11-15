import React from "react";
import { Box, Container, Typography } from "@mui/material";
import RouteLink from "./RouteLink";
import { generateTermRoute } from "../utils/Utils";
import SearchCard from "./SearchCard";
import theme from "../app/theme";
import { SearchResult } from "../api/WordsAPI";

const SearchResultView: React.FC<SearchResult> = ({
  label,
  isWord,
  items,
  vocabularies,
}) => {
  //Decides whether user is redirected to term page or to word page
  const routeProps = isWord
    ? `/disambiguation?label=${label}`
    : generateTermRoute(items[0]);
  if (routeProps === "/error") return null;

  const border = isWord
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  return (
    <Container>
      <RouteLink to={routeProps} underline="none">
        <SearchCard borderColor={`${border} !important`}>
          <Typography variant="h4"> {label}</Typography>
          {Object.keys(vocabularies).map((vocabularyUri) => {
            return (
              <Box mt={1} key={vocabularyUri}>
                <Typography variant="h6">
                  {vocabularies[vocabularyUri]}
                </Typography>
              </Box>
            );
          })}
        </SearchCard>
      </RouteLink>
    </Container>
  );
};

export default SearchResultView;
