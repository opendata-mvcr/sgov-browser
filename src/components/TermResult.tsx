import React from "react";
import { SearchTerm } from "./SearchResult";
import { Box, Container, styled } from "@material-ui/core";
import DefinitionSnippet from "./DefinitionSnippet";
import RouteLink from "./RouteLink";
import IriLabel from "./IriLabel";

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
        <RouteLink to={{ pathname: "term", state: props }} underline="none">
          <DefinitionSnippet
            uri={props.uri}
            vocabulary={props.vocabulary}
            label={props.label}
          />
          <IriLabel iri={props.vocabulary} />
        </RouteLink>
      </TermBox>
    </Container>
  );
};

export default TermResult;
