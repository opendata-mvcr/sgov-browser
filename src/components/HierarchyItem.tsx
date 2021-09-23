import React from "react";
import { Box } from "@material-ui/core";
import { ReactComponent as TallConnector } from "../assets/connector_taller.svg";

interface HierarchyItemProps {
  level: number;
}

const HierarchyItem: React.FC<HierarchyItemProps> = (props) => {
  // The connector is hidden for now, will be visible in the next PR
  return (
    <Box display="flex" ml={props.level * 5} mt={2}>
      <Box style={{ position: "relative", minWidth: "28px" }}>
        <TallConnector
          style={{
            visibility: "hidden",
            position: "absolute",
            top: "-45px",
            zIndex: -1,
          }}
        />
      </Box>
      <Box style={{ flex: 1 }}>{props.children}</Box>
    </Box>
  );
};

export default HierarchyItem;
