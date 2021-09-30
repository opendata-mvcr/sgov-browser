import React, { ReactElement } from "react";
import { Box, styled } from "@material-ui/core";

interface HierarchyItemProps {
  level: number;
  connector?: ReactElement;
}

const ConnectorBox = styled(Box)({
  width: "16px",
  height: "100%",
  border: "solid #E7E7E7",
});

export const NormalEnd: React.FC = () => {
  return <ConnectorBox ml={4} style={{ borderWidth: "0px 0px 4px 4px" }} />;
};

export const ChildrenEnd: React.FC = () => {
  return <ConnectorBox style={{ borderWidth: "0px 0px 4px 4px" }} />;
};

export const ParentEnd: React.FC = () => {
  return <ConnectorBox style={{ borderWidth: "4px 0px 0px 4px" }} />;
};

export const ParentsEnd: React.FC = () => {
  return (
    <>
      <ConnectorBox style={{ borderWidth: "4px 0px 4px 4px" }} />
      <ConnectorBox style={{ borderWidth: "0px 0px 4px 0px" }} />
      <ConnectorBox style={{ borderWidth: "0px 0px 4px 0px" }} />
    </>
  );
};

const HierarchyItem: React.FC<HierarchyItemProps> = (props) => {
  return (
    <Box display="flex" ml={props.level * 4} mt={2}>
      <Box style={{ position: "relative", minWidth: "16px" }}>
        <Box
          display="flex"
          flexDirection="row"
          style={{
            position: "absolute",
            top: "28px",
            zIndex: -1,
            height: `calc(100% + 16px)`,
          }}
        >
          {props.connector}
        </Box>
      </Box>
      <Box style={{ flex: 1 }}>{props.children}</Box>
    </Box>
  );
};

export default HierarchyItem;
