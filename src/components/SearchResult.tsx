import React from "react";
import { Box, Container, styled } from "@material-ui/core";
import RouteLink from "./RouteLink";
import IriLabel from "./IriLabel";
import { generateTermRoute } from "../utils/Utils";

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

  //Decides whether user is redirected to term page or to word page
  let routeProps;
  try {
    routeProps = props.isWord
      ? `/disambiguation?label=${props.label}`
      : generateTermRoute(props.items[0]);
  } catch (e) {
    //Grr this is really ugly, I will fix it in the near future
    console.log(props);
    console.log(e);
    routeProps = "/error";
  }

  return (
    <Container>
      <SearchBox>
        <RouteLink to={routeProps}>{props.label}</RouteLink>
        {props.vocabularies.map((item: string) => {
          return <IriLabel key={item} iri={item} />;
        })}
      </SearchBox>
    </Container>
  );
};

export default SearchResult;
