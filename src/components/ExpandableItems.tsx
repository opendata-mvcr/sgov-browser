import React from "react";
import { TermBaseInterface } from "../api/data/terms";

export interface ExpandableItemsProps {
  items: TermBaseInterface[];
  level: number;
  vocabularyDefault: string;
}
