import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { CircularProgress, InputAdornment } from "@material-ui/core";
import { useSearch } from "../api/WordsAPI";
import { useHistory } from "react-router-dom";
import { SearchItem } from "./SearchResult";
import { find, debounce } from "lodash";
import { generateTermRoute } from "../utils/Utils";

const OPTIONS_LIMIT = 7;
const defaultFilterOptions = createFilterOptions();

const filterOptions = (options: any, state: any) => {
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
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
}));
const useOtherStyles = makeStyles(() => ({
  icon: {
    color: "gray",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

interface SearchBarProps {
  size: "small" | "large";
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const searchInput = useRef(null);
  const classes = useStyles(props);
  const otherClasses = useOtherStyles();
  const [inputValue, setInputValue] = useState<string | undefined>();
  const { data = [], isLoading } = useSearch(inputValue);
  const history = useHistory();

  const onChangeHandler = (label: string | null) => {
    // This part checks whether a mouse is hovering over a text
    // @ts-ignore
    label = searchInput.current?.getAttribute("aria-activedescendant")
      ? label
      : inputValue;

    const item = find<SearchItem>(data, { label: label ?? "" });
    if (!item) {
      history.push(`/search?label=${label}`);
    } else if (item.isWord) {
      history.push(`/disambiguation?label=${label}`);
    } else {
      const prop = item.items[0];
      history.push(generateTermRoute(prop));
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
          className={otherClasses.icon}
          onClick={() => {
            if (!(inputValue === undefined || inputValue === "")) {
              onChangeHandler(inputValue);
            }
          }}
        />
      )}
    </InputAdornment>
  );

  return (
    <Autocomplete
      open={true}
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
      ListboxProps={{
        onMouseOut: (item: any) => {
          // @ts-ignore
          searchInput.current?.removeAttribute("aria-activedescendant");
          if (item.target.attributes.getNamedItem("data-focus"))
            item.target.attributes.removeNamedItem("data-focus");
        },
      }}
      options={data.map((item) => item.label)}
      onInputChange={debouncedChangeHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Zadejte hledané slovo"
          inputRef={searchInput}
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
