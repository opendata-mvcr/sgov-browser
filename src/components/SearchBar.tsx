import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { CircularProgress, InputAdornment } from "@material-ui/core";
import theme from "../app/theme";
import { useSearch } from "../api/WordsAPI";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    border: "1px solid #e2e2e1",
    color: theme.palette.text.secondary,
    borderRadius: 26,
    /**This should be done differently to make the component reusable**/
    fontSize: 26,
    height: 63,
    backgroundColor: "#fcfcfb",
    paddingLeft: theme.spacing(6),
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&$focused": {
      backgroundColor: "#fff",
    },
  },
  paper: {
    color: theme.palette.text.secondary,
  },
}));

const SearchBar: React.FC = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<string | undefined>();
  const { data = [], isLoading } = useSearch(inputValue);
  const history = useHistory();

  const onChangeHandler = (label: string | null) => {
      history.push(`/search?label=${label}`);
  };

  const endAdornment = (
    <InputAdornment position="start">
      {isLoading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <SearchIcon
          fontSize="large"
          style={{
            color: "gray",
            marginRight: theme.spacing(1),
          }}
        />
      )}
    </InputAdornment>
  );

  return (
    <Autocomplete
      classes={classes}
      loading={isLoading}
      onChange={(event: any, newValue: string | null) => {
        onChangeHandler(newValue);
      }}
      loadingText="Načítání"
      noOptionsText="Nebyly nalezeny žádné výsledky"
      fullWidth
      freeSolo
      options={data.map((item) => item.label)}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
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
