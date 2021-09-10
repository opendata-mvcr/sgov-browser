import React from "react";
import { Box, Typography } from "@material-ui/core";
import { ReactComponent as Empty } from "../assets/empty.svg";

const NoResults: React.FC = () => {
  return (
    <Box style={{ textAlign: "center" }} pt={2} pr={6}>
      <Empty style={{ maxHeight: 330, maxWidth: "80%", marginBottom: 30 }} />
      <Typography variant="h2">Nebyly nalezeny žádné výsledky</Typography>
    </Box>
  );
};

export default NoResults;
