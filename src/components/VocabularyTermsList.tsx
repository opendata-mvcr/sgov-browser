import { FixedSizeList as List, areEqual } from "react-window";
import RouteLink from "./RouteLink";
import React, { memo } from "react";
import { DetailItemWrapper } from "./Hierarchy";
import { Box, Link } from "@material-ui/core";
import AutoSizer from "react-virtualized-auto-sizer";
import { makeStyles } from "@material-ui/core/styles";
import memoize from "memoize-one";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    borderColor: "#e0e0e0 !important",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
}));

interface VocabularyTermsListProps {
  terms: {
    uri: string;
    vocabulary: string;
    label: { cs?: string };
    route: string;
  }[];
}

const Row = memo(({ data, index, style }: any) => {
  const classes = useStyles();
  const { items } = data;
  const item = items[index];

  return (
    <div style={style}>
      <Box borderBottom={2} className={classes.wrapper}>
        <RouteLink
          to={item.route}
          variant="h6"
          style={{
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.label.cs}
        </RouteLink>
      </Box>
    </div>
  );
}, areEqual);

const createItemData = memoize((items) => ({
  items,
}));

const VocabularyTermsList: React.FC<VocabularyTermsListProps> = (props) => {
  const itemData = createItemData(props.terms);

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
              itemData={itemData}
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
