import React from "react";
import { Typography } from "@material-ui/core";
import { map } from "lodash";

interface AltLabelProps {
  altLabels?: { cs?: string }[];
}

const AltLabel: React.FC<AltLabelProps> = (props) => {
  const altLabels = map(props.altLabels, "cs").join(", ");
  if (!altLabels) return null;
  return (
    <Typography variant="h5" color="textSecondary">
      {altLabels}
    </Typography>
  );
};

export default AltLabel;
