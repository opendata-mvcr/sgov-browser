import React from "react";
import { SearchTerm } from "../api/WordsAPI";
import { Box, Container, Typography } from "@material-ui/core";
import DefinitionSnippet from "./DefinitionSnippet";
import RouteLink from "./RouteLink";
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
          <DefinitionSnippet {...props} />
          <Box mt={1}>
            <Typography variant="h6">{props.vocabulary.title}</Typography>
          </Box>
        </SearchCard>
      </RouteLink>
    </Container>
  );
};

export default TermResult;
