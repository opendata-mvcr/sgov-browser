import React from "react";
import { SearchTerm } from "./SearchResult";
import { Box, Container, styled } from "@material-ui/core";
import DefinitionSnippet from "./DefinitionSnippet";
import RouteLink from "./RouteLink";
import IriLabel from "./IriLabel";
import { generateTermRoute } from "../utils/Utils";

const Wrapper = styled(Box)(({ theme }) => ({
  borderLeft: "solid",
  borderLeftWidth: "4px",
  borderColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  backgroundColor: "#fff",
  borderRadius: "4px",
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  "&:hover": {
    boxShadow:
      "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  },
}));

const TermResult: React.FC<SearchTerm> = (props) => {
  const route = generateTermRoute(props);
  if (route === "/error") return null;
  return (
    <Container>
      <Wrapper>
        <RouteLink to={route} underline="none">
          <DefinitionSnippet
            uri={props.uri}
            vocabulary={props.vocabulary}
            label={props.label}
          />
          <IriLabel iri={props.vocabulary} />
        </RouteLink>
      </Wrapper>
    </Container>
  );
};

export default React.memo(TermResult);
