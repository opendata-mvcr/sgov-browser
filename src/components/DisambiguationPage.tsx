import React, { useEffect, useState } from "react";
import useRouteQuery from "../hooks/useRouteQuery";
import { useSearch } from "../api/WordsAPI";
import _ from "lodash";
import { Box, Container, Typography } from "@material-ui/core";
import { SearchItem, SearchTerm } from "./SearchResult";
import TermResult from "./TermResult";
import Loader from "./Loader";
import usePrefetchTerms from "../hooks/usePrefetchTerms";
import { DetailHeaderWrapper } from "./DetailPageHeader";
import NumberOfResults from "./NumberOfResults";

const DisambiguationPage: React.FC = () => {
  const routeQuery = useRouteQuery();
  const wordLabel = routeQuery.get("label");
  const {
    data = [],
    isSuccess,
    isLoading,
  } = useSearch(wordLabel ?? undefined);

  const [terms, setTerms] = useState<SearchTerm[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const item = _.find<SearchItem>(data, { label: wordLabel ?? "" });
      if (item) {
        setTerms(item.items);
      }
    }
  }, [data, isSuccess, wordLabel]);



  return (
    <Box flex={1} display="flex" flexDirection="column">
      <DetailHeaderWrapper>
        <Typography variant="h3" color="textSecondary">
          {wordLabel ?? ""}
        </Typography>
      </DetailHeaderWrapper>
      <WordContent terms={terms} parentLoading={isLoading}/>
    </Box>
  );
};

interface WordContentProps {
  terms: SearchTerm[];
  parentLoading: boolean;
}

const WordContent: React.FC<WordContentProps> = (props) => {
  const [isLoading, amount] = usePrefetchTerms(props.terms);
  if (isLoading || props.parentLoading) return <Loader />;
  return (
    <Container>
      <Box pt={2} pb={4}>
        <NumberOfResults amount={amount} />
        {props.terms.map((term: SearchTerm) => {
          return (
            <TermResult
              key={term.uri}
              uri={term.uri}
              vocabulary={term.vocabulary}
              label={term.label}
            />
          );
        })}
      </Box>
    </Container>
  );
};
export default DisambiguationPage;
