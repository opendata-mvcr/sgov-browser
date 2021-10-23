import { FixedSizeList as List } from "react-window";
import React from "react";
import { DetailItemWrapper } from "./Hierarchy";
import { Link as RouterLink } from "react-router-dom";
// @ts-ignore
import { ReactWindowScroller } from "react-window-scroller";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  wrapper: {
    borderBottom: "1px solid #e0e0e0",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  text: {
    fontSize: "1.25rem",
    fontFamily: "Poppins,sans-serif",
    fontWeight: 500,
    lineHeight: "1.6",
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textDecoration: "underline",
    color: "#000000",
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
const VocabularyTermsListWindow: React.FC<VocabularyTermsListProps> = (
  props
) => {
  const classes = useStyles();
  return (
    <DetailItemWrapper title={"Pojmy"}>
      <ReactWindowScroller>
        {({ ref, outerRef, style, onScroll }: any) => (
          <List
            ref={ref}
            width={10}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            itemCount={props.terms.length}
            itemSize={34}
            onScroll={onScroll}
          >
            {({ index, style }) => (
              <div style={style}>
                <div className={classes.wrapper}>
                  <RouterLink
                    to={props.terms[index].route}
                    className={classes.text}
                  >
                    {props.terms[index].label.cs}
                  </RouterLink>
                </div>
              </div>
            )}
          </List>
        )}
      </ReactWindowScroller>
    </DetailItemWrapper>
  );
};
export default VocabularyTermsListWindow;
