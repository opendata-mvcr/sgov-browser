import React from "react";
import { Box, Container, styled, Typography } from "@mui/material";
import RouteLink from "../RouteLink";
import SearchCard from "./SearchCard";
import theme from "../../app/theme";
import { SearchResult } from "../../api/WordsAPI";
import { generateStyledSnippet } from "../../utils/TermUtils";
import { popisDat } from "../../api/data/namespaces";
import TypeIcon from "../TypeIcon";
import { generateRoute } from "../../utils/SearchUtil";
import MaxLineText from "../MaxLineText";

const HighlightedText = styled(Typography)(({ theme }) => ({
  //For some reason the line height becomes an issue while working with dynamic font sizes
  //We set the line height dynamically to solve disappearing bottom part of texts while using hidden when overflow happens
  "--fontsize": "1.5625rem",
  "--slightShift": "0.2rem",
  "@media (min-width: 600px)": {
    "--fontsize": "1.8219rem",
  },
  "@media (min-width: 900px)": {
    "--fontsize": "2.0243rem",
  },
  whiteSpace: "nowrap",
  lineHeight: `calc((${theme.typography.h4.lineHeight} * var(--fontsize)) + var(--slightShift))`,
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
  const routeProps = generateRoute({
    type: type,
    items: items,
    label: label,
    vocabularies: vocabularies,
  });
  if (routeProps === "/error") return null;

  const border = type.includes(popisDat["slovník"])
    ? theme.palette.secondary.main
    : theme.palette.primary.main;
  return (
    <Container>
      <RouteLink to={routeProps} underline="none">
        <SearchCard borderColor={`${border} !important`}>
          <Box display="flex">
            <TypeIcon type={type} width={17} height={20} />
            {type.includes(popisDat["slovník"]) ? (
              <MaxLineText
                variant="h4"
                maxlines={3}
                dangerouslySetInnerHTML={{
                  __html: displayText,
                }}
              />
            ) : (
              <HighlightedText
                variant="h4"
                dangerouslySetInnerHTML={{
                  __html: displayText,
                }}
              />
            )}
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
          {
            //If result is not vocabulary show associated vocabularies of the result
            !type.includes(popisDat["slovník"]) &&
              Object.keys(vocabularies).map((vocabularyUri) => {
                return (
                  <Box mt={1} key={vocabularyUri}>
                    <Typography variant="h6">
                      {vocabularies[vocabularyUri]}
                    </Typography>
                  </Box>
                );
              })
          }
        </SearchCard>
      </RouteLink>
    </Container>
  );
};

export default SearchResultView;
