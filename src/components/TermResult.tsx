import React from "react";
import { SearchTerm } from "./SearchResult";
import { Container } from "@material-ui/core";
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
      <SearchCard borderColor={`${theme.palette.primary.main} !important`}>
        <RouteLink to={route} underline="none">
          <DefinitionSnippet
            uri={props.uri}
            vocabulary={props.vocabulary}
            label={props.label}
          />
          <IriLabel iri={props.vocabulary} />
        </RouteLink>
      </SearchCard>
    </Container>
  );
};

export default React.memo(TermResult);
