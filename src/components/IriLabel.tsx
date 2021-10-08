import React from "react";
import { useLabel } from "../api/LabelAPI";
import { Typography, TypographyProps } from "@material-ui/core";

export interface IriItem {
  iri: string;
}

const IriLabel: React.FC<IriItem & TypographyProps> = (props) => {
  const { data, isSuccess, isLoading } = useLabel(props.iri);
  if (isLoading)
    return (
      <Typography variant="h6" {...props}>
        Načítání...
      </Typography>
    );
  if (isSuccess) {
    return (
      <Typography variant="h6" {...props}>
        {data}
      </Typography>
    );
  }
  return null;
};

export default React.memo(IriLabel);
