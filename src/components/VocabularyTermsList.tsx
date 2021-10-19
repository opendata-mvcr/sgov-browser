import { FixedSizeList as List } from "react-window";
import RouteLink from "./RouteLink";
import React from "react";
import { generateTermRoute } from "../utils/Utils";
import { TermBase } from "../api/TermAPI";
import { DetailItemWrapper } from "./Hierarchy";
import { Box } from "@material-ui/core";

interface VocabularyTermsListProps {
  terms: { uri: string; vocabulary: string; label: { cs?: string } }[];
}

const VocabularyTermsList: React.FC<VocabularyTermsListProps> = (props) => {
  const Row = ({ index, style }: any) => {
    const curr = props.terms[index];
    const termBase: TermBase = { uri: curr.uri, vocabulary: curr.vocabulary };
    const route = generateTermRoute(termBase);
    return (
      <div style={style}>
        <Box borderBottom={2} borderColor="#e0e0e0 !important">
          <RouteLink to={route} variant="h6">
            {curr.label.cs}
          </RouteLink>
        </Box>
      </div>
    );
  };

  return (
    <DetailItemWrapper title={"Pojmy"}>
      <Box mt={2}>
        <List
          height={350}
          itemCount={props.terms.length}
          itemSize={34}
          width={700}
          overscanCount={5}
        >
          {Row}
        </List>
      </Box>
    </DetailItemWrapper>
  );
};
export default VocabularyTermsList;
