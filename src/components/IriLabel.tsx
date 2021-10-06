import React from "react";
import { useLabel } from "../api/LabelAPI";
import { Typography, TypographyProps } from "@material-ui/core";

export interface IriItem {
  iri: string;
}

const IriLabel: React.FC<IriItem & TypographyProps> = (props) => {
  const { data, isSuccess } = useLabel(props.iri);
  const result = isSuccess ? data : "Načítání";
  return (
    <Typography variant="h6" {...props}>
      {result}
    </Typography>
  );
};

export default React.memo(IriLabel);
