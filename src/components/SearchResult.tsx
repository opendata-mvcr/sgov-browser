import React from "react";
import { Box, Button, Container, styled, Typography } from "@material-ui/core";
import {useSearch} from "../api/WordsAPI";
import {useLabel} from "../api/LabelAPI";
import Label from "./Label";

interface Item {
  vocabulary: string
}

interface SearchItem {
  label: string;
  isWord: boolean;
  vocabularies: string[];
  items: Item[];
}

const SearchResult: React.FC<SearchItem> = (props) => {

  const SearchBox = styled(Box)(({ theme }) => ({
    borderLeft: "solid",
    borderColor: props.isWord
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(2)
  }));
  return (
    <Container>
      <SearchBox>
        <Typography variant="h2">{props.label}</Typography>
        {props.vocabularies.map((item) => {
          return <Label iri={item}/>;
        })}
      </SearchBox>
    </Container>
  );
};

export default SearchResult;
