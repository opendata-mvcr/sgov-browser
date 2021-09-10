import React from "react";
import { Box, Container, styled } from "@material-ui/core";
import Label from "./Label";
import RouteLink from "./RouteLink";

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
  const SearchBox = styled(Box)(({ theme }) => ({
    borderLeft: "solid",
    borderColor: props.isWord
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  }));

  const route = props.isWord ? `/disambiguation?label=${props.label}` : "/term";
  return (
    <Container>
      <SearchBox>
        <RouteLink to={route}>{props.label}</RouteLink>
        {props.vocabularies.map((item: string) => {
          return <Label key={item} iri={item} />;
        })}
      </SearchBox>
    </Container>
  );
};

export default SearchResult;
