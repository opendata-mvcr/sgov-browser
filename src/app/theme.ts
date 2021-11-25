import { createTheme } from "@mui/material";

const primary = "#00BC58";
const secondary = "#3F3D56";
const primaryText = "#000000";
const secondaryText = "#FFFFFF";
const lightText = "#797979";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    text: {
      primary: primaryText,
      secondary: secondaryText,
      disabled: lightText,
    },
    divider: secondaryText,
    //  background: { default: 'black' },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 600,
      fontSize: 60,
    },
    h2: {
      fontWeight: 400,
      fontSize: 40,
    },
  },
});

export default theme;
