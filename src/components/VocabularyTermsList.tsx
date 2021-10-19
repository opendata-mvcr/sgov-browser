import { FixedSizeList as List } from "react-window";
import RouteLink from "./RouteLink";
import React from "react";
import { generateTermRoute } from "../utils/Utils";
import { TermBase } from "../api/TermAPI";
import { DetailItemWrapper } from "./Hierarchy";
import { Box } from "@material-ui/core";
import AutoSizer from "react-virtualized-auto-sizer";

interface VocabularyTermsListProps {
  terms: { uri: string; vocabulary: string; label: { cs?: string } }[];
}

const VocabularyTermsList: React.FC<VocabularyTermsListProps> = (props) => {
  const Row = ({ index, style }: any) => {
    const curr = props.terms[index];
    //This is not good, these functions are called multiple times, whenever the term is in the view
    const termBase: TermBase = { uri: curr.uri, vocabulary: curr.vocabulary };
    const route = generateTermRoute(termBase);
    return (
      <div style={style}>
        <Box borderBottom={2} borderColor="#e0e0e0 !important">
          <RouteLink
            to={route}
            variant="h6"
            style={{
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {curr.label.cs}
          </RouteLink>
        </Box>
      </div>
    );
  };
  const customHeight = props.terms.length < 10 ? props.terms.length * 34 : 350;
  return (
    <DetailItemWrapper title={"Pojmy"}>
      <Box mt={2} height={customHeight}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={props.terms.length}
              itemSize={34}
              width={width}
              overscanCount={10}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </Box>
    </DetailItemWrapper>
  );
};
export default VocabularyTermsList;
