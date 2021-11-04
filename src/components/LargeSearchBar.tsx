import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import SearchBar from "./SearchBar";

interface LargeSearchBarProps {
  searchedText: string | null;
}

const LargeSearchBar: React.FC<LargeSearchBarProps> = ({ searchedText }) => {
  return (
    <Box bgcolor="primary.main" py={2}>
      <Container>
        <SearchBar size="large" initialValue={searchedText ?? ""} />
      </Container>
    </Box>
  );
};

export default LargeSearchBar;
