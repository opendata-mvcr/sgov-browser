import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import SearchBar from "./SearchBar";

interface LargeSearchBarProps {
  searchedText: string | null;
}

const LargeSearchBar: React.FC<LargeSearchBarProps> = (props) => {
  return (
    <Box bgcolor="primary.main" py={2}>
      <Container>
        <SearchBar size="large" />
        <Box pl={6} pt={2}>
          <Typography variant="h5" color="textSecondary">
            Bohužel jsme nenalezli přesný význam slova "{props.searchedText}"
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LargeSearchBar;
