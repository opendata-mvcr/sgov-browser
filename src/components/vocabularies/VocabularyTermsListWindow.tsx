import { FixedSizeList as List } from "react-window";
import React, { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ReactWindowScroller } from "../../utils/ReactWindowScroller";
import makeStyles from "@mui/styles/makeStyles";
import { VocabularyTermInterface } from "../../api/data/vocabularies";
import { generateTermRoute } from "../../utils/Utils";
import { DetailItemWrapper } from "../terms/Hierarchy";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
    lineHeight: "1.6",
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textDecoration: "none",
    color: "#000000",
    "& em": {
      fontStyle: "normal",
      fontWeight: 700,
    },
  },
  noDecoration: {
    textDecoration: "none",
    color: "#000000",
  },
}));

interface VocabularyTermsListProps {
  vocabularyIri: string;
  terms: VocabularyTermInterface[];
}

const getHighlightedText = (originalLabel: string, searchedPart: string) => {
  if (searchedPart === "") {
    return originalLabel;
  }

  const regexForAfter = new RegExp(`(?<=${searchedPart})`, "gi");
  const regexForBefore = new RegExp(`(?=${searchedPart})`, "gi");
  const replaced = originalLabel.replace(regexForAfter, "</em>");
  return replaced.replace(regexForBefore, "<em>");
};

const endAdornment = (
  <InputAdornment position={"end"}>
    <SearchIcon />
  </InputAdornment>
);

const VocabularyTermsListWindow: React.FC<VocabularyTermsListProps> = ({
  vocabularyIri,
  terms,
}) => {
  const classes = useStyles();
  const [filterText, setFilterText] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };
  const filteredTerms = useMemo(() => {
    return terms
      .filter((term) => {
        if (filterText === "") return true;
        else {
          return term.label.toLowerCase().includes(filterText.toLowerCase());
        }
      })
      .map((term) => {
        return {
          $id: term.$id,
          $type: term.$type,
          label: getHighlightedText(term.label, filterText),
        };
      });
  }, [terms, filterText]);

  const getTermRoute = (term: VocabularyTermInterface) => {
    return generateTermRoute({
      $id: term.$id,
      vocabulary: { $id: vocabularyIri },
    });
  };

  const filter = (
    <Box ml={4}>
      <TextField
        value={filterText}
        onChange={handleChange}
        size={"small"}
        fullWidth
        placeholder="Zadejte hledaný pojem"
        InputProps={{
          endAdornment: endAdornment,
        }}
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
                    className={classes.noDecoration}
                  >
                    <div
                      className={classes.text}
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
