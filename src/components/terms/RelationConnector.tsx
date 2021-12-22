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
  if (type === "tline") connector = <TLine />;
  if (type === "hline") connector = <HLine />;
  if (type === "lline") connector = <LLine />;
  if (type === "r_hline") connector = <ReverseHLine />;
  if (type === "r_lline") connector = <ReverseLLine />;
  if (type === "r_tline") connector = <ReverseTLine />;

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
