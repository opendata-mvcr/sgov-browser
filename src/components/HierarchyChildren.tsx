import React from "react";
import { ExpandableItemsProps } from "./ExpandableItems";
import { TermAccordion } from "./TermAccordion";
import { ChildrenEnd } from "./HierarchyItem";

const HierarchyChildren: React.FC<ExpandableItemsProps> = (props) => {
  return (
    <>
      {props.items?.map((item, index) => {
        const connector =
          index + 1 !== props.items.length ? <ChildrenEnd /> : undefined;
        return (
          <TermAccordion
            level={props.level}
            term={item}
            key={item.uri}
            connector={connector}
          />
        );
      })}
    </>
  );
};

export default HierarchyChildren;
