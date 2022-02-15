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
  else if (type === "m_hline") connector = <MobileHLine />;
  else if (type === "m_f_hline") connector = <MobileFlippedHLine />;
  else if (type === "m_lline") connector = <MobileLLine />;
  else if (type === "m_lline90") connector = <MobileLLine90 />;
  else if (type === "m_lline180") connector = <MobileLLine180 />;
  else if (type === "m_lline270") connector = <MobileLLine270 />;
  else if (type === "m_f_lline") connector = <MobileFlippedLLine />;
  else if (type === "m_f_lline90") connector = <MobileFlippedLLine90 />;
  else if (type === "m_f_lline180") connector = <MobileFlippedLLine180 />;
  else if (type === "m_horizontal") connector = <MobileHorizontal />;
  else if (type === "m_vertical") connector = <MobileVertical />;
  else if (type === "m_f_vertical") connector = <MobileFlippedVertical />;
  else return null;

  return (
    <Box display="flex" flex={1} style={{ height: "100%" }}>
      {connector}
    </Box>
  );
};

//For desktop view only
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

//For mobile only

export const MobileLLine: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 4px" }} />
      <ConnectorBox flex={1} style={{ borderWidth: "4px 0px 0px 0px" }} />
    </Box>
  );
};

export const MobileLLine90: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox flex={1} style={{ borderWidth: "0px 4px 2px 0px" }} />
      <ConnectorBox flex={1} style={{ borderWidth: "2px 0px 0px 0px" }} />
    </Box>
  );
};

export const MobileLLine180: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 2px 0px" }} />
      <ConnectorBox flex={1} style={{ borderWidth: "2px 4px 0px 0px" }} />
    </Box>
  );
};

export const MobileLLine270: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 2px 0px" }} />
      <ConnectorBox flex={1} style={{ borderWidth: "2px 0px 0px 4px" }} />
    </Box>
  );
};

export const MobileFlippedLLine: React.FC = () => {
    return (
        <Box flex={1}>
            <ConnectorBox flex={1} style={{ borderWidth: "0px 4px 2px 0px" }} />
            <ConnectorBox flex={1} style={{ borderWidth: "2px 0px 0px 0px" }} />
        </Box>
    );
};

export const MobileFlippedLLine90: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 2px 4px" }} />
      <ConnectorBox flex={1} style={{ borderWidth: "2px 0px 0px 0px" }} />
    </Box>
  );
};

export const MobileFlippedLLine180: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 4px 0px" }} />
      <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 4px" }} />
    </Box>
  );
};

export const MobileHLine: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox flex={1} style={{ borderWidth: "0px 0px 0px 4px" }} />
      <ConnectorBox flex={1} style={{ borderWidth: "4px 0px 0px 4px" }} />
    </Box>
  );
};

export const MobileFlippedHLine: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox flex={1} style={{ borderWidth: "0px 4px 0px 0px" }} />
      <ConnectorBox flex={1} style={{ borderWidth: "4px 4px 0px 0px" }} />
    </Box>
  );
};

//Straight shifted
export const MobileHorizontal: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox style={{ borderWidth: "0px 0px 2px 0px" }} />
      <ConnectorBox style={{ borderWidth: "2px 0px 0px 0px" }} />
    </Box>
  );
};

export const MobileVertical: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox style={{ borderWidth: "0px 0px 0px 4px" }} />
      <ConnectorBox style={{ borderWidth: "0px 0px 0px 4px" }} />
    </Box>
  );
};

export const MobileFlippedVertical: React.FC = () => {
  return (
    <Box flex={1}>
      <ConnectorBox style={{ borderWidth: "0px 4px 0px 0px" }} />
      <ConnectorBox style={{ borderWidth: "0px 4px 0px 0px" }} />
    </Box>
  );
};

export default RelationConnector;
