import React, { ReactElement } from "react";
import { Box } from "@material-ui/core";

interface HierarchyItemProps {
  level: number;
  connector?: ReactElement;
}

export const ParentEnd: React.FC = () => {
  return (
    <Box
      style={{
        width: "16px",
        height: "100%",
        borderLeft: "4px solid #E7E7E7",
        borderTop: "4px solid #E7E7E7",
      }}
    />
  );
};

export const ChildrenEnd: React.FC = () => {
  return (
    <Box
      style={{
        width: "16px",
        height: "100%",
        borderLeft: "4px solid #E7E7E7",
        borderBottom: "4px solid #E7E7E7",
      }}
    />
  );
};

export const ParentsEnd: React.FC = () => {
  return (
    <>
      <Box
        style={{
          width: "16px",
          height: "100%",
          borderTop: "4px solid #E7E7E7",
          borderLeft: "4px solid #E7E7E7",
          borderBottom: "4px solid #E7E7E7",
        }}
      />
      <Box
        style={{
          width: "16px",
          height: "100%",
          borderBottom: "4px solid #E7E7E7",
        }}
      />
      <Box
        style={{
          width: "16px",
          height: "100%",
          borderBottom: "4px solid #E7E7E7",
        }}
      />
    </>
  );
};

export const NormalEnd: React.FC = () => {
  return (
    <>
      <Box
        style={{
          width: "16px",
          height: "100%",
        }}
      />
      <Box
        style={{
          width: "16px",
          height: "100%",
        }}
      />
      <Box
        style={{
          width: "16px",
          height: "100%",
          borderBottom: "4px solid #E7E7E7",
          borderLeft: "4px solid #E7E7E7",
        }}
      />
    </>
  );
};

//TODO: add adequate connectors to the terms
// situations: 1) multiple parent terms, 2) single parent terms, 3) children -> line from current + in children

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
