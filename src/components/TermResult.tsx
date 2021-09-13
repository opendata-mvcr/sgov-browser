import React from "react";
import { SearchTerm } from "./SearchResult";
import { Box, Container, styled } from "@material-ui/core";
import Label from "./Label";
import DefinitionSnippet from "./DefinitionSnippet";
import RouteLink from "./RouteLink";

const TermResult: React.FC<SearchTerm> = (props) => {
  const TermBox = styled(Box)(({ theme }) => ({
    borderLeft: "solid",
    borderColor: theme.palette.primary.main,
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  }));
  return (
    <Container>
      <TermBox>
        <RouteLink to={{pathname: 'term', state: props}}>{props.label}</RouteLink>
        <Label iri={props.vocabulary} />
        <DefinitionSnippet
          uri={props.uri}
          vocabulary={props.vocabulary}
          label={props.label}
        />
      </TermBox>
    </Container>
  );
};

export default TermResult;
