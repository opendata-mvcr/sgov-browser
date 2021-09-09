import React from "react";
import { Box, Container, Link, styled } from "@material-ui/core";
import Label from "./Label";
import { Link as RouterLink } from "react-router-dom";

//TODO: move these interfaces somewhere else
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
        <Link
          variant="h2"
          color="textPrimary"
          underline="always"
          component={RouterLink}
          to={route}
        >
          {props.label}
        </Link>
        {/** TODO: vocabulary interface**/}
        {props.vocabularies.map((item) => {
          return <Label key={item} iri={item} />;
        })}
      </SearchBox>
    </Container>
  );
};

export default SearchResult;
