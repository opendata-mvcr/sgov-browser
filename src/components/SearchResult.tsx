import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import RouteLink from "./RouteLink";
import IriLabel from "./IriLabel";
import { generateTermRoute } from "../utils/Utils";
import SearchCard from "./SearchCard";
import theme from "../app/theme";

export interface SearchTerm {
  uri: string;
  vocabulary: string;
  label: string;
}

export interface SearchItem {
  label: string;
  isWord: boolean;
  vocabularies: string[];
  items: SearchTerm[];
  snippetField?: string;
}

const SearchResult: React.FC<SearchItem> = (props) => {
  //Decides whether user is redirected to term page or to word page
  const routeProps = props.isWord
    ? `/disambiguation?label=${props.label}`
    : generateTermRoute(props.items[0]);
  if (routeProps === "/error") return null;

  const border = props.isWord
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  return (
    <Container>
      <RouteLink to={routeProps} underline="none">
        <SearchCard borderColor={`${border} !important`}>
          <Typography variant="h4"> {props.label}</Typography>
          {props.vocabularies.map((item: string) => {
            return (
              <Box mt={1} key={item}>
                <IriLabel iri={item} variant={"h6"} />
              </Box>
            );
          })}
        </SearchCard>
      </RouteLink>
    </Container>
  );
};

export default SearchResult;
