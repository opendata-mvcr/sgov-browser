import React, { ReactElement } from "react";
import { RelationsItemProps } from "./TermRelations";
import { Box } from "@mui/material";
import { CurrentRelationTerm } from "./RelationItem";
import RelationConnector from "./RelationConnector";
import RelationItemWrapper, {
  RelationItemWrapperProps,
} from "./RelationItemWrapperMobile";
import { getRelationPosition } from "../../utils/TermUtils";

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

  const rangeArr = [...ranges, currEl];
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

//Gets the appropriate connectors for domain relations
const getDomainConnectors = (
  position: string,
  currElement: ReactElement
): RelationItemWrapperProps => {
  //debugger;
  if (position === "FIRST" || position === "ONLY_ONE") {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_lline180"} />,
      row2L: <RelationConnector type={"m_lline270"} />,
      row2M: <RelationConnector type={"m_horizontal"} />,
      row2R: <RelationConnector type={"m_lline90"} />,
    };
  }
  if (position === "MIDDLE" || position === "PENULTIMATE") {
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
  if (position === "FIRST") {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_lline180"} />,
      row2R: <RelationConnector type={"m_f_vertical"} />,
    };
  }
  if (position === "ONLY_ONE") {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_lline180"} />,
      row2R: <RelationConnector type={"m_f_vertical"} />,
      row2M: <RelationConnector type={"m_horizontal"} />,
    };
  }
  if (position === "MIDDLE") {
    return {
      row1R: <RelationConnector type={"m_f_hline"} />,
      row1M: currElement,
      row2R: <RelationConnector type={"m_f_vertical"} />,
    };
  }
  if (position === "PENULTIMATE") {
    return {
      row1R: <RelationConnector type={"m_f_hline"} />,
      row1M: currElement,
      row2L: <RelationConnector type={"m_lline270"} />,
      row2M: <RelationConnector type={"m_horizontal"} />,
      row2R: <RelationConnector type={"m_f_lline"} />,
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

export default TermRelationsMobile;
