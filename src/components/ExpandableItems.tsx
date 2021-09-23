import React from "react";
import { TermAccordion } from "./TermAccordion";
import { TermInfo } from "./Hierarchy";

interface ExpandableItemsProps {
  items: TermInfo[];
  level: number;
}

const ExpandableItems: React.FC<ExpandableItemsProps> = (props) => {
  return (
    <>
      {props.items?.map((item) => {
        return <TermAccordion level={props.level} term={item} key={item.uri} />;
      })}
    </>
  );
};

export default ExpandableItems;
