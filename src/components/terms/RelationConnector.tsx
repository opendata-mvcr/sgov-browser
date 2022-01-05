import React from "react";
import { Box, styled } from "@mui/material";

const ConnectorBox = styled(Box)({
  border: "solid #E7E7E7",
  minWidth: "16px",
  height: "50%",
  flex: "1",
});

interface RelationConnectorProps {
  type?: string;
}

const RelationConnector: React.FC<RelationConnectorProps> = ({ type }) => {
  let connector;
  if (type === "straight") connector = <StraightLine />;
  else if (type === "tline") connector = <TLine />;
  else if (type === "hline") connector = <HLine />;
  else if (type === "lline") connector = <LLine />;
  else if (type === "r_hline") connector = <ReverseHLine />;
  else if (type === "r_lline") connector = <ReverseLLine />;
  else if (type === "r_tline") connector = <ReverseTLine />;
  else return null;

  return (
    <Box display="flex" flex={1} style={{ height: "100%" }}>
      {connector}
    </Box>
  );
};

export const StraightLine: React.FC = () => {
  return (
    <>
      <Box flex={1}>
        <ConnectorBox style={{ borderWidth: "0px 0px 4px 0px" }} />
        <ConnectorBox style={{ borderWidth: "0px 0px 0px 0px" }} />
      </Box>

      <Box flex={1}>
        <ConnectorBox style={{ borderWidth: "0px 0px 4px 0px" }} />
        <ConnectorBox style={{ borderWidth: "0px 0px 0px 0px" }} />
      </Box>
    </>
  );
};

export const TLine: React.FC = () => {
  return (
    <>
      <Box flex={1}>
        <ConnectorBox style={{ borderWidth: "0px 0px 4px 0px" }} />
        <ConnectorBox style={{ borderWidth: "0px 0px 0px 0px" }} />
      </Box>

      <Box flex={1}>
        <ConnectorBox style={{ borderWidth: "0px 0px 4px 0px" }} />
        <ConnectorBox style={{ borderWidth: "0px 0px 0px 4px" }} />
      </Box>
    </>
  );
};

export const ReverseTLine: React.FC = () => {
  return (
    <>
      <Box flex={1}>
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 4px 0px" }} />
        <ConnectorBox flex={1} style={{ borderWidth: "0px 4px 0px 0px" }} />
      </Box>

      <Box flex={1}>
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 4px 0px" }} />
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 0px" }} />
      </Box>
    </>
  );
};

export const HLine: React.FC = () => {
  return (
    <>
      <Box flex={1}>
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 0px" }} />
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 0px" }} />
      </Box>

      <Box flex={1}>
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 4px 4px" }} />
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 4px" }} />
      </Box>
    </>
  );
};

export const ReverseHLine: React.FC = () => {
  return (
    <>
      <Box flex={1}>
        <ConnectorBox flex={1} style={{ borderWidth: "0px 4px 4px 0px" }} />
        <ConnectorBox flex={1} style={{ borderWidth: "0px 4px 0px 0px" }} />
      </Box>

      <Box flex={1}>
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 0px" }} />
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 0px" }} />
      </Box>
    </>
  );
};

export const LLine: React.FC = () => {
  return (
    <>
      <Box flex={1}>
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 0px" }} />
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 0px" }} />
      </Box>

      <Box flex={1}>
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 4px" }} />
        <ConnectorBox flex={1} style={{ borderWidth: "4px 0px 0px 0px" }} />
      </Box>
    </>
  );
};

export const ReverseLLine: React.FC = () => {
  return (
    <>
      <Box flex={1}>
        <ConnectorBox flex={1} style={{ borderWidth: "0px 4px 0px 0px" }} />
        <ConnectorBox flex={1} style={{ borderWidth: "4px 0px 0px 0px" }} />
      </Box>

      <Box flex={1}>
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 0px" }} />
        <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 0px" }} />
      </Box>
    </>
  );
};

export default RelationConnector;
