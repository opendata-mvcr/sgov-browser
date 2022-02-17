import React, { ReactElement } from "react";
import { RelationsItemProps } from "./TermRelations";
import { Box } from "@mui/material";
import { CurrentRelationTerm } from "./RelationItem";
import RelationConnector from "./RelationConnector";
import RelationItemWrapper, {
  RelationItemWrapperProps,
} from "./RelationItemWrapperMobile";
import { getRelationPosition, RelationPosition } from "../../utils/TermUtils";

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

  const rangeArr = [...ranges];
  const rangeRows = rangeArr.map((item, index) => {
    const position = getRelationPosition(index, rangeArr.length);
    const props = getRangeConnectors(position, item);
    return <RelationItemWrapper key={item.key} {...props} />;
  });

  return (
    <Box>
      {domains.length !== 0 && domainRows}
      {ranges.length !== 0 && rangeRows}
      {ranges.length !== 0 && (
        <RelationItemWrapper key={currEl.key} {...wrappedCurrent(currEl)} />
      )}
    </Box>
  );
};

//Code belows addresses all possible connectors for terms regarding their position in the visualisation

const wrappedCurrent = (
  currElement: ReactElement
): RelationItemWrapperProps => {
  return {
    row1M: currElement,
    row1L: <RelationConnector type={"m_lline"} />,
  };
};

const getDomainConnectors = (
  position: RelationPosition,
  currElement: ReactElement
): RelationItemWrapperProps => {
  if (
    position === RelationPosition.FIRST ||
    position === RelationPosition.ONLY_ONE
  ) {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_lline180"} />,
      row2L: <RelationConnector type={"m_lline270"} />,
      row2M: <RelationConnector type={"m_horizontal"} />,
      row2R: <RelationConnector type={"m_lline90"} />,
    };
  }
  if (position === RelationPosition.MIDDLE) {
    return {
      row1L: <RelationConnector type={"m_hline"} />,
      row1M: currElement,
      row2L: <RelationConnector type={"m_vertical"} />,
    };
  }
  if (position === RelationPosition.LAST) {
    return {
      row1L: <RelationConnector type={"m_lline"} />,
      row1M: currElement,
    };
  }

  return { row1M: currElement };
};

const getRangeConnectors = (
  position: RelationPosition,
  currElement: ReactElement
): RelationItemWrapperProps => {
  if (position === RelationPosition.FIRST) {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_lline180"} />,
      row2R: <RelationConnector type={"m_f_vertical"} />,
    };
  }
  if (position === RelationPosition.ONLY_ONE) {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_lline180"} />,
      row2R: <RelationConnector type={"m_f_lline"} />,
      row2M: <RelationConnector type={"m_horizontal"} />,
      row2L: <RelationConnector type={"m_lline270"} />,
    };
  }
  if (position === RelationPosition.MIDDLE) {
    return {
      row1R: <RelationConnector type={"m_f_hline"} />,
      row1M: currElement,
      row2R: <RelationConnector type={"m_f_vertical"} />,
    };
  }
  if (position === RelationPosition.LAST) {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_f_hline"} />,
      row2R: <RelationConnector type={"m_f_lline"} />,
      row2M: <RelationConnector type={"m_horizontal"} />,
      row2L: <RelationConnector type={"m_lline270"} />,
    };
  }

  return { row1M: currElement };
};

export default TermRelationsMobile;
