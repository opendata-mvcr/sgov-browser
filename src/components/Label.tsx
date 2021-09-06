import React from "react";
import { useLabel } from "../api/LabelAPI";
import { Typography } from "@material-ui/core";

interface LabelItem {
  iri: string;
}

const Label: React.FC<LabelItem> = (props) => {
  const { data, isSuccess } = useLabel(props.iri);

  if (isSuccess) {
    return <Typography variant="h6">{data}</Typography>;
  }

  return <></>;
};



export default React.memo(Label);
