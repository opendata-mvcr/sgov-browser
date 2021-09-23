import React from "react";
import CurrentTerm from "./CurrentTerm";
import { Box, Container, Typography } from "@material-ui/core";
import ExpandableItems from "./ExpandableItems";

export interface TermInfo {
  uri: string;
  label: { cs?: string };
  vocabulary: string;
}

interface HierarchyProps {
  data: {
    uri: string;
    vocabulary: string;
    label: { cs?: string };
    subTerms: TermInfo[];
    parentTerms: TermInfo[];
  };
}

export const Hierarchy: React.FC<HierarchyProps> = (props) => {
  if (!props.data.parentTerms && !props.data.subTerms.length) return null;

  const current: TermInfo = {
    uri: props.data.uri,
    label: props.data.label,
    vocabulary: props.data.vocabulary,
  };

  const currIndex = props.data.parentTerms ? 1 : 0;
  return (
    <Container>
      <Box py={2} mb={10} px={2} mt={2}>
        <Box borderLeft={4} pr={6} borderColor="primary.main">
          <Box pl={4}>
            <Typography variant="h5">Hierarchie</Typography>
          </Box>
          <ExpandableItems items={props.data.parentTerms} level={0} />
          <CurrentTerm level={currIndex} term={current} />
          <ExpandableItems items={props.data.subTerms} level={currIndex + 1} />
        </Box>
      </Box>
    </Container>
  );
};
