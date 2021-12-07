import React from "react";
import { styled, Typography, TypographyProps } from "@mui/material";

interface MaxLineTextProp {
  maxlines: number;
}
const MaxLineText: React.FC<TypographyProps & MaxLineTextProp> = (props) => {
  const Text = styled(Typography)(({ theme }) => ({
    "--fontsize": "1.5625rem",
    "@media (min-width: 600px)": {
      "--fontsize": "1.8219rem",
    },
    "@media (min-width: 900px)": {
      "--fontsize": "2.0243rem",
    },
    position: "relative",
    maxHeight: `calc(${theme.typography.h4.lineHeight} * var(--fontsize) * ${props.maxlines})`,
    overflow: "hidden",
    paddingRight: "1.6rem" /* space for ellipsis */,
    "&::before": {
      position: "absolute",
      content: '"\\002026"',
      bottom: 0,
      right: 0,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      width: "1.8rem",
      height: "2.1rem",
      background: theme.palette.text.secondary,
    },
    "& em": {
      fontStyle: "normal",
      fontWeight: 600,
    },
  }));
  return <Text {...props}>{props.children}</Text>;
};

export default MaxLineText;
