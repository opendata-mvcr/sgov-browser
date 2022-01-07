import React from "react";
import { TermBaseInterface } from "../../api/data/terms";
//TODO: Why is this here? Move it somewhere else
export interface ExpandableItemsProps {
  items: TermBaseInterface[];
  level: number;
  vocabularyDefault: string;
}
