import React, { ReactElement } from "react";
import { RelationsItemProps } from "./TermRelations";
import { Box, BoxProps, Typography } from "@mui/material";
import { CurrentRelationTerm } from "./RelationItem";
import RelationConnector from "./RelationConnector";
import { calculateConnector } from "./Relations";

const TermRelationsMobile: React.FC<RelationsItemProps> = ({
  domains,
  currentTerm,
  ranges,
}) => {
  const currEl = (
    <CurrentRelationTerm key={currentTerm.$id} data={currentTerm} />
  );

  const domainArr = [currEl, ...domains];

  const domainRows = domainArr.map((item, index) => {
    const position = getRelationPosition(index, domainArr.length);
    const props = getDomainConnectors(position, item);
    return <RelationItemWrapper key={item.key} {...props} />;
  });

  const rangeArr = [currEl, ...ranges];
  const rangeRows = rangeArr.map((item, index) => {
    const position = getRelationPosition(index, rangeArr.length);
    const props = getRangeConnectors(position, item);
    return <RelationItemWrapper key={item.key} {...props} />;
  });

  return (
    <Box>
      {domains.length !== 0 && domainRows}
      {ranges.length !== 0 && rangeRows}
    </Box>
  );
};

interface RelationItemWrapperProps {
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

const getRelationPosition = (index: number, size: number) => {
  if (size === 1) {
    return "ONLY_ONE";
  } else if (size > 1 && index === 0) {
    return "FIRST";
  } else if (size > 1 && index + 1 !== size) {
    return "MIDDLE";
  } else if (size > 1 && index + 1 === size) {
    return "LAST";
  }
  return "UNKNOWN";
};

//Gets the appropriate connectors for domain relations
const getDomainConnectors = (
  position: string,
  currElement: ReactElement
): RelationItemWrapperProps => {
  if (position === "FIRST" || position === "ONLY_ONE") {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_lline180"} />,
      row2L: <RelationConnector type={"m_lline270"} />,
      row2M: <RelationConnector type={"m_horizontal"} />,
      row2R: <RelationConnector type={"m_lline90"} />,
    };
  }
  if (position === "MIDDLE") {
    return {
      row1L: <RelationConnector type={"m_hline"} />,
      row1M: currElement,
      row2L: <RelationConnector type={"m_vertical"} />,
    };
  }
  if (position === "LAST") {
    return {
      row1L: <RelationConnector type={"m_lline"} />,
      row1M: currElement,
    };
  }

  return {};
};
//Gets the appropriate connectors for range relations
const getRangeConnectors = (
  position: string,
  currElement: ReactElement
): RelationItemWrapperProps => {
  if (position === "FIRST" || position === "ONLY_ONE") {
    return {
      row1L: <RelationConnector type={"m_f_lline180"} />,
      row1M: currElement,
      row2L: <RelationConnector type={"m_f_lline90"} />,
      row2M: <RelationConnector type={"m_horizontal"} />,
      row2R: <RelationConnector type={"m_lline180"} />,
    };
  }
  if (position === "MIDDLE") {
    return {
      row1R: <RelationConnector type={"m_f_hline"} />,
      row1M: currElement,
      row2R: <RelationConnector type={"m_f_vertical"} />,
    };
  }
  if (position === "LAST") {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_f_lline"} />,
    };
  }

  return {};
};

export default TermRelationsMobile;
