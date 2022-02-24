import React, { ReactElement } from "react";
import { Box, BoxProps } from "@mui/material";

export interface RelationItemWrapperProps {
  row1L?: ReactElement;
  row1M?: ReactElement;
  row1R?: ReactElement;
  row2L?: ReactElement;
  row2M?: ReactElement;
  row2R?: ReactElement;
  boxProps?: BoxProps;
}

const RelationItemWrapper: React.FC<RelationItemWrapperProps> = ({
  row1L,
  row1M,
  row1R,
  row2L,
  row2M,
  row2R,
  boxProps,
}) => {
  return (
    <Box display="flex" width="100%" flexDirection="column" {...boxProps}>
      {/**Top row**/}
      <Box flex={1} display={"flex"}>
        <Box flex={1} maxWidth={16}>
          {row1L}
        </Box>
        <Box
          flex={10}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {row1M}
        </Box>
        <Box flex={1} maxWidth={16}>
          {row1R}
        </Box>
      </Box>

      {/**Bottom row**/}
      <Box flex={1} display={"flex"} minHeight={16}>
        <Box flex={1} maxWidth={16}>
          {row2L}
        </Box>
        <Box flex={10}>{row2M}</Box>
        <Box flex={1} maxWidth={16}>
          {row2R}
        </Box>
      </Box>
    </Box>
  );
};

export default RelationItemWrapper;
