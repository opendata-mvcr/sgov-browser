import React from "react";
import { Box, Container, styled, Typography } from "@mui/material";
import RouteLink from "./RouteLink";
import { generateTermRoute, generateVocabularyRoute } from "../utils/Utils";
import SearchCard from "./SearchCard";
import theme from "../app/theme";
import { SearchResult } from "../api/WordsAPI";
import { generateStyledSnippet } from "../utils/TermUtils";
import { skos } from "@ldkit/namespaces";
import { popisDat } from "../api/data/namespaces";
import TypeIcon from "./TypeIcon";

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
  type,
  items,
  vocabularies,
  isMatchInDefinition,
  snippetText,
  displayText,
}) => {
  //Decides whether user is redirected to term page or to word page
  //TODO: rewrite this to separate method
  let routeProps = "";
  if (type.includes(skos.Concept)) routeProps = generateTermRoute(items[0]);
  if (type.includes(skos.Collection))
    routeProps = `/disambiguation?label=${label}`;
  if (type.includes(popisDat["slovník"]))
    routeProps = generateVocabularyRoute(vocabularies["id"]);
  if (routeProps === "/error") return null;

  const border = type.includes(popisDat["slovník"])
    ? theme.palette.secondary.main
    : theme.palette.primary.main;
  return (
    <Container>
      <RouteLink to={routeProps} underline="none">
        <SearchCard borderColor={`${border} !important`}>
          <Box display="flex" alignItems="center">
            <TypeIcon type={type} width={17} height={20} />
            <HighlightedText
              variant="h4"
              dangerouslySetInnerHTML={{
                __html: displayText,
              }}
            />
          </Box>

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
          {!type.includes(popisDat["slovník"]) &&
            Object.keys(vocabularies).map((vocabularyUri) => {
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
