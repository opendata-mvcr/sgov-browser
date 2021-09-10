import React from "react";
import { SearchTerm } from "./SearchResult";
import { Box, Container, Link, styled } from "@material-ui/core";
import Label from "./Label";
import DefinitionSnippet from "./DefinitionSnippet";
import { Link as RouterLink } from "react-router-dom";

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
        <Link
          component={RouterLink}
          to="/term"
          variant="h2"
          color="textPrimary"
          underline="always"
        >
          {props.label}
        </Link>
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
