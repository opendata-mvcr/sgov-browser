import React from "react";
import { Container, Typography } from "@material-ui/core";
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
      <SearchCard borderColor={`${border} !important`}>
        <RouteLink to={routeProps} underline="none">
          <Typography variant="h2"> {props.label}</Typography>
          {props.vocabularies.map((item: string) => {
            return <IriLabel key={item} iri={item} />;
          })}
        </RouteLink>
      </SearchCard>
    </Container>
  );
};

export default SearchResult;
