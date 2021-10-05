import React from "react";
import { DotLoader } from "react-spinners";
import theme from "../app/theme";
import { Box, Typography } from "@material-ui/core";

const Loader: React.FC = () => {
  return (
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <DotLoader
            color={theme.palette.primary.main}
            size={150}
            css="display: block;"
        />
        <Box pl={3}><Typography variant="h2">Načítání</Typography></Box>
      </Box>
  );
};

export default Loader;