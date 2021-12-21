import React from "react";
import {Box, styled, Typography} from "@mui/material";

const ConnectorBox = styled(Box)({
    border: "solid #E7E7E7",
    minWidth: "16px",
    flex:"1"
});

interface RelationConnectorProps{
    type?: string
}
const RelationConnector: React.FC<RelationConnectorProps> = ({type}) => {
  return (
    <Box display="flex" flex={1}>
      <Box flex={1} bgcolor="primary.main">
        <ConnectorBox flex={1}>

        </ConnectorBox>
        <ConnectorBox flex={1}>

        </ConnectorBox>
      </Box>

      <Box flex={1} bgcolor="secondary.main">
        <ConnectorBox flex={1}>

        </ConnectorBox>
        <ConnectorBox flex={1}>

        </ConnectorBox>
      </Box>
    </Box>
  );
};
export default RelationConnector;
