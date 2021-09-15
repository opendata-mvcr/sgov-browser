import React from "react";
import { useLabel } from "../api/LabelAPI";
import { Typography } from "@material-ui/core";

export interface IriItem {
  iri: string;
}

const SearchLabel: React.FC<IriItem> = (props) => {
  const { data, isSuccess } = useLabel(props.iri);

  if (isSuccess) {
    return <Typography variant="h6">{data}</Typography>;
  }

  return <></>;
};

export default React.memo(SearchLabel);
