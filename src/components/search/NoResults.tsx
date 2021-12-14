import React from "react";
import { Box, Typography } from "@mui/material";
import { ReactComponent as Empty } from "../../assets/empty.svg";

const NoResults: React.FC = () => {
  return (
    <Box style={{ textAlign: "center" }} pt={2}>
      <Empty style={{ maxHeight: 330, maxWidth: "80%", marginBottom: 30 }} />
      <Typography variant="h2">Nebyly nalezeny žádné výsledky</Typography>
    </Box>
  );
};

export default NoResults;
