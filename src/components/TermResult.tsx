import React from "react";
import { SearchTerm } from "./SearchResult";
import { Box, Container } from "@material-ui/core";
import DefinitionSnippet from "./DefinitionSnippet";
import RouteLink from "./RouteLink";
import IriLabel from "./IriLabel";
import { generateTermRoute } from "../utils/Utils";
import SearchCard from "./SearchCard";
import theme from "../app/theme";

const TermResult: React.FC<SearchTerm> = (props) => {
  const route = generateTermRoute(props);
  if (route === "/error") return null;
  return (
    <Container>
      <RouteLink to={route} underline="none">
        <SearchCard borderColor={`${theme.palette.primary.main} !important`}>
          <DefinitionSnippet
            uri={props.uri}
            vocabulary={props.vocabulary}
            label={props.label}
          />
          <Box mt={1}>
            <IriLabel iri={props.vocabulary} variant={"h6"} />
          </Box>
        </SearchCard>
      </RouteLink>
    </Container>
  );
};

export default React.memo(TermResult);
