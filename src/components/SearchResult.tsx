import React from "react";
import { Box, Container, styled, Typography } from "@mui/material";
import RouteLink from "./RouteLink";
import { generateTermRoute } from "../utils/Utils";
import SearchCard from "./SearchCard";
import theme from "../app/theme";
import { SearchResult } from "../api/WordsAPI";
import { generateStyledSnippet } from "../utils/TermUtils";

const HighlightedText = styled(Typography)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "& em": {
    fontStyle: "normal",
    fontWeight: 600,
  },
}));

const SearchResultView: React.FC<SearchResult> = ({
  label,
  isWord,
  items,
  vocabularies,
  isMatchInDefinition,
  snippetText,
  displayText,
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
          <HighlightedText
            variant="h4"
            dangerouslySetInnerHTML={{
              __html: displayText,
            }}
          />
          {isMatchInDefinition && (
            <Box mt={1}>
              <HighlightedText
                variant="h5"
                dangerouslySetInnerHTML={{
                  __html: generateStyledSnippet(
                    snippetText,
                    isMatchInDefinition
                  ),
                }}
              />
            </Box>
          )}
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
