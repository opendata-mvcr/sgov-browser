import { FixedSizeList as List } from "react-window";
import React, { useMemo, useState } from "react";
import { DetailItemWrapper } from "./Hierarchy";
import { Link as RouterLink } from "react-router-dom";
import { ReactWindowScroller } from "../utils/ReactWindowScroller";
import makeStyles from "@mui/styles/makeStyles";
import { VocabularyTermInterface } from "../api/data/vocabularies";
import { generateTermRoute } from "../utils/Utils";
import { Box, TextField } from "@mui/material";
import { generateStyledSnippet } from "../utils/TermUtils";

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
    "& em": {
      fontStyle: "normal",
      fontWeight: 700,
    },
  },
}));

interface VocabularyTermsListProps {
  vocabularyIri: string;
  terms: VocabularyTermInterface[];
}

function split_at_index(value: string, index: number, length: number) {
  return [
    value.substring(0, index),
    value.substring(index, index + length),
    value.substring(index + length),
  ];
}

const getHighlightedTex = (text: string, termText: string) => {
  let searchedText = text.toLowerCase();
  let original = termText.toLowerCase();
  let index = original.indexOf(searchedText);
  let splitted = split_at_index(termText, index, text.length);
  if (splitted[0] || splitted[1])
    return `${splitted[0]}<em>${splitted[1]}</em>${splitted[2]}`;
  else return termText;
};

const VocabularyTermsListWindow: React.FC<VocabularyTermsListProps> = ({
  vocabularyIri,
  terms,
}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const filteredTerms = useMemo(() => {
    return terms
      .filter((term) => {
        if (name === "") return true;
        else {
          return term.label.toLowerCase().includes(name.toLowerCase());
        }
      })
      .map((term) => {
        return {
          $id: term.$id,
          $type: term.$type,
          label: getHighlightedTex(name, term.label),
        };
      });
  }, [terms, name]);

  const getTermRoute = (term: VocabularyTermInterface) => {
    return generateTermRoute({
      $id: term.$id,
      vocabulary: { $id: vocabularyIri },
    });
  };

  const filter = (
    <Box ml={2}>
      <TextField
        id="filter"
        value={name}
        onChange={handleChange}
        size={"small"}
        fullWidth
      />
    </Box>
  );

  return (
    <DetailItemWrapper title={"Pojmy"} secondaryElement={filter}>
      <ReactWindowScroller>
        {({ ref, outerRef, style, onScroll }: any) => (
          <List
            ref={ref}
            width={10}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            itemCount={filteredTerms.length}
            itemSize={34}
            onScroll={onScroll}
          >
            {({ index, style }) => (
              <div style={style}>
                <div className={classes.wrapper}>
                  <RouterLink
                    to={getTermRoute(filteredTerms[index])}
                    className={classes.text}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: filteredTerms[index].label,
                      }}
                    />
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
