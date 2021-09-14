import React, { useState } from "react";
import { ReactComponent as Copy } from "../assets/copy_small.svg";
import { Box, Button, Tooltip, Typography } from "@material-ui/core";
import {IriItem} from "./SearchLabel";

const Content = React.forwardRef((props: any, ref: any) => {
  return (
      <Button {...props} ref={ref} fullWidth >
        <Box
          flex={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Copy style={{ maxHeight: 33 }} />
          <Typography variant="h5" color="textSecondary">
            IRI
          </Typography>
        </Box>
      </Button>
  );
});

const IRI: React.FC<IriItem> = (props) => {
  const [title, setTitle] = useState("Zkopírovat IRI");
  const click = () => {
    navigator.clipboard
      .writeText(props.iri)
      .then(() => setTitle("Zkopírováno!"));
  };
  return (
    <Tooltip title={title} arrow>
      <Content onClick={click} />
    </Tooltip>
  );
};

export default IRI;
