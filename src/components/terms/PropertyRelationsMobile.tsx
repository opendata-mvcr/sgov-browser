import React, { ReactElement } from "react";
import { RelationsItemProps } from "./TermRelations";
import { Box } from "@mui/material";
import { CurrentRelationTerm } from "./RelationItem";
import { getRelationPosition, RelationPosition } from "../../utils/TermUtils";
import RelationItemWrapper, {
  RelationItemWrapperProps,
} from "./RelationItemWrapperMobile";
import RelationConnector from "./RelationConnector";

const PropertyRelationsMobile: React.FC<RelationsItemProps> = ({
  domains,
  ranges,
  currentTerm,
}) => {
  const domainRows = domains.map((item, index) => {
    const position = getRelationPosition(index, domains.length);
    const props = getDomainConnectors(position, item);
    return <RelationItemWrapper key={item.key} {...props} />;
  });

  const rangeRows = ranges.map((item, index) => {
    const position = getRelationPosition(index, ranges.length);
    const props = getRangeConnectors(position, item);
    return <RelationItemWrapper key={item.key} {...props} />;
  });

  const currEl = (
    <CurrentRelationTerm key={currentTerm.$id} data={currentTerm} />
  );

  return (
    <Box mt={1}>
      {domains.length !== 0 && domainRows}
      <RelationItemWrapper key={currEl.key} {...wrappedCurrent(currEl)} />
      {ranges.length !== 0 && rangeRows}
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
    row1R: <RelationConnector type={"m_lline180"} />,
    row2M: <RelationConnector type={"m_horizontal"} />,
    row2R: <RelationConnector type={"m_f_lline"} />,
    row2L: <RelationConnector type={"m_lline270"} />,
  };
};

const getDomainConnectors = (
  position: RelationPosition,
  currElement: ReactElement
): RelationItemWrapperProps => {
  if (position === RelationPosition.ONLY_ONE) {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_lline180"} />,
      row2R: <RelationConnector type={"m_f_lline"} />,
      row2M: <RelationConnector type={"m_horizontal"} />,
      row2L: <RelationConnector type={"m_lline270"} />,
    };
  }
  if (position === RelationPosition.FIRST) {
    return {
      row1M: currElement,
      row1R: <RelationConnector type={"m_lline180"} />,
      row2R: <RelationConnector type={"m_f_vertical"} />,
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
      row1M: currElement,
      row1R: <RelationConnector type={"m_f_hline"} />,
      row2R: <RelationConnector type={"m_f_lline"} />,
      row2M: <RelationConnector type={"m_horizontal"} />,
      row2L: <RelationConnector type={"m_lline270"} />,
    };
  }

  return { row1M: currElement };
};

const getRangeConnectors = (
  position: RelationPosition,
  currElement: ReactElement
): RelationItemWrapperProps => {
  if (position === RelationPosition.ONLY_ONE) {
    return {
      row1L: <RelationConnector type={"m_lline"} />,
      row1M: currElement,
    };
  }
  if (
    position === RelationPosition.MIDDLE ||
    position === RelationPosition.FIRST
  ) {
    return {
      row1M: currElement,
      row1L: <RelationConnector type={"m_hline"} />,
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

export default PropertyRelationsMobile;
