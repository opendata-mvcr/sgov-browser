import React from "react";
import { SearchTerm } from "./SearchResult";
import { Box, Container, Link, styled } from "@material-ui/core";
import Label from "./Label";
import DefinitionSnippet from "./DefinitionSnippet";

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
        <Link color="textPrimary" underline="always" variant="h2">
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
