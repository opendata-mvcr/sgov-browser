import { FixedSizeList as List } from "react-window";
import React from "react";
import { DetailItemWrapper } from "./Hierarchy";
import { Link as RouterLink } from "react-router-dom";
import { ReactWindowScroller } from "../utils/ReactWindowScroller";
import makeStyles from "@mui/styles/makeStyles";
import { VocabularyTermInterface } from "../api/data/vocabularies";
import { generateTermRoute } from "../utils/Utils";

//Unfortunately the makeStyles performs better than styled
//Even though makeStyles is considered legacy, I would leave it here for now
const useStyles = makeStyles(() => ({
  wrapper: {
    borderBottom: "1px solid #e0e0e0",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  text: {
    fontSize: "1.25rem",
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
  vocabularyIri: string;
  terms: VocabularyTermInterface[];
}

const VocabularyTermsListWindow: React.FC<VocabularyTermsListProps> = ({
  vocabularyIri,
  terms,
}) => {
  const classes = useStyles();

  const getTermRoute = (term: VocabularyTermInterface) => {
    return generateTermRoute({
      $id: term.$id,
      vocabulary: { $id: vocabularyIri },
    });
  };

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
            itemCount={terms.length}
            itemSize={34}
            onScroll={onScroll}
          >
            {({ index, style }) => (
              <div style={style}>
                <div className={classes.wrapper}>
                  <RouterLink
                    to={getTermRoute(terms[index])}
                    className={classes.text}
                  >
                    {terms[index].label}
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
