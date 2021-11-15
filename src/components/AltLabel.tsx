import React from "react";
import { Typography } from "@mui/material";
import { TermInterface } from "../api/data/terms";

interface AltLabelProps {
  altLabels: TermInterface["altLabels"];
}

const AltLabel: React.FC<AltLabelProps> = ({ altLabels }) => {
  if (!altLabels || altLabels.length < 1) {
    return null;
  }

  return (
    <Typography variant="h5" color="textSecondary">
      {altLabels.join(", ")}
    </Typography>
  );
};

export default AltLabel;
