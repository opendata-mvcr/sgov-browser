import React from "react";
import { ExpandableItemsProps } from "./ExpandableItems";
import { TermAccordion } from "./TermAccordion";
import { ChildrenEnd } from "./HierarchyItem";

const HierarchyChildren: React.FC<ExpandableItemsProps> = (props) => {
  return (
    <>
      {props.items?.map((item, index) => {
        if (index + 1 === props.items.length)
          return (
            <TermAccordion level={props.level} term={item} key={item.uri} />
          );
        return (
          <TermAccordion
            level={props.level}
            term={item}
            key={item.uri}
            connector={<ChildrenEnd />}
          />
        );
      })}
    </>
  );
};

export default HierarchyChildren;
