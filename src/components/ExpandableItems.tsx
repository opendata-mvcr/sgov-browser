import React from "react";
import { TermInfo } from "./Hierarchy";

export interface ExpandableItemsProps {
  items: TermInfo[];
  level: number;
  vocabularyDefault: string;
}

