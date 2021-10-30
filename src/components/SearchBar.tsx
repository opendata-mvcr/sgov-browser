import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { CircularProgress, InputAdornment } from "@material-ui/core";
import { useDirectSearch, DirectSearchResult } from "../api/WordsAPI";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import { generateTermRoute } from "../utils/Utils";

const OPTIONS_LIMIT = 7;

const filterOptions = (options: DirectSearchResult[], state: any) => {
  return options.slice(0, OPTIONS_LIMIT) as DirectSearchResult[];
};

const useStyles = makeStyles((theme) => ({
  inputRoot: (props: SearchBarProps) => ({
    border: "1px solid #e2e2e1",
    color: theme.palette.text.primary,
    borderRadius: props.size === "large" ? 26 : 16,
    fontSize: props.size === "large" ? 26 : 16,
    height: props.size === "large" ? 63 : 38,
    backgroundColor: "#fcfcfb",
    paddingLeft: props.size === "large" ? theme.spacing(6) : theme.spacing(1),
    paddingRight:
      props.size === "large"
        ? `${theme.spacing(6)}px !important`
        : `${theme.spacing(1)}px !important`,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff",
    },
  }),
  paper: {
    color: theme.palette.text.primary,
  },
  option: {
    "& em": {
      fontStyle: "normal",
      fontWeight: 700,
    },
  },
}));

interface SearchBarProps {
  size: "small" | "large";
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const classes = useStyles(props);
  const [inputValue, setInputValue] = useState<string | undefined>();
  const { data = [], isLoading } = useDirectSearch(inputValue);
  const history = useHistory();

  const onChangeHandler = (option: DirectSearchResult | string | null) => {
    if (typeof option === "string") {
      history.push(`/search?label=${option}`);
    } else if (!option) {
      return;
    } else {
      // option selected
      if (option.isWord) {
        history.push(`/disambiguation?label=${option.label}`);
      } else {
        const prop = option.items[0];
        history.push(generateTermRoute(prop));
      }
    }
  };

  const handleChange = useMemo(
    () => (event: ChangeEvent<{}>, newInputValue: string) => {
      setInputValue(newInputValue);
    },
    [setInputValue]
  );

  const debouncedChangeHandler = useMemo(
    () => debounce(handleChange, 300),
    [handleChange]
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  const endAdornment = (
    <InputAdornment position="end">
      {isLoading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <SearchIcon
          fontSize={props.size === "small" ? "medium" : "large"}
          style={{
            color: "gray",
          }}
        />
      )}
    </InputAdornment>
  );

  return (
    <Autocomplete
      classes={classes}
      onChange={(event: any, newValue: any) => {
        if (newValue !== null) {
          onChangeHandler(newValue);
        }
      }}
      filterOptions={filterOptions}
      noOptionsText="Nebyly nalezeny žádné výsledky"
      fullWidth
      freeSolo
      options={data}
      getOptionLabel={(option: DirectSearchResult) => option.label}
      renderOption={(option: DirectSearchResult) => (
        <div dangerouslySetInnerHTML={{ __html: option.displayText }}></div>
      )}
      onInputChange={debouncedChangeHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Zadejte hledané slovo"
          InputProps={{
            ...params.InputProps,
            endAdornment: endAdornment,
            disableUnderline: true,
          }}
        />
      )}
    />
  );
};

export default SearchBar;
