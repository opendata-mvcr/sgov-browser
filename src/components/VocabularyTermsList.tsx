import {
  FixedSizeList as List,
  areEqual,
  ListChildComponentProps,
} from "react-window";
import RouteLink from "./RouteLink";
import React, { memo } from "react";
import { DetailItemWrapper } from "./Hierarchy";
import { Box } from "@material-ui/core";
import AutoSizer from "react-virtualized-auto-sizer";
import { makeStyles } from "@material-ui/core/styles";
import memoize from "memoize-one";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    borderBottom: "1px solid #e0e0e0",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
}));

const Row = memo(({ data, index, style }: ListChildComponentProps) => {
  const classes = useStyles();
  const { items } = data;
  const item = items[index % items.length];

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

const Row2 = memo(({ data, index, style }: ListChildComponentProps) => {
  const { items } = data;
  const item = items[index % items.length];

  return (
    <div style={style}>
      <a href={"/"}> {item.label.cs}</a>
    </div>
  );
}, areEqual);

const createItemData = memoize((items) => ({
  items,
}));

export interface VocabularyTermsListProps {
  terms: {
    uri: string;
    vocabulary: string;
    label: { cs?: string };
    route: string;
  }[];
}

const VocabularyTermsList: React.FC<VocabularyTermsListProps> = (props) => {
  const itemData = createItemData(props.terms);
  const customHeight = props.terms.length < 10 ? props.terms.length * 34 : 350;
  const classes = useStyles();
  return (
    <DetailItemWrapper title={"Pojmy"}>
      <Box mt={2} height={customHeight}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={1000}
              itemSize={34}
              width={width}
              itemData={itemData}
            >
              {({ index, style }) => (
                <div style={style}>
                  <div className={classes.wrapper}>
                    <RouteLink
                      to={props.terms[index % props.terms.length].route}
                      variant="h6"
                      style={{
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {props.terms[index % props.terms.length].label.cs}
                    </RouteLink>
                  </div>
                </div>
              )}
            </List>
          )}
        </AutoSizer>
      </Box>
    </DetailItemWrapper>
  );
};
export default VocabularyTermsList;
