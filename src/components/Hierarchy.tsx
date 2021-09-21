import React from "react";
import { CurrentTerm, TermAccordion } from "./TermAccordion";
import { Box, Container, Typography } from "@material-ui/core";

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

const Hierarchy: React.FC<HierarchyProps> = (props) => {
  const parentTerm: TermInfo | null =
    props.data.parentTerms !== null ? props.data.parentTerms[0] : null;
  const subTerm: TermInfo = props.data.subTerms[0];
  const current: TermInfo = {
    uri: props.data.uri,
    label: props.data.label,
    vocabulary: props.data.vocabulary,
  };
  if (!parentTerm && !subTerm) return null;
  return (
    <Container>
      <Box py={2} mb={10} px={2}>
        <Box borderLeft={4} pr={6} borderColor="primary.main">
          <Box pl={4}>
            <Typography variant="h5">Hierarchie</Typography>
          </Box>
          {parentTerm && <TermAccordion level={0} term={parentTerm} />}
          <CurrentTerm level={parentTerm ? 1 : 0} term={current} />
          {subTerm && (
            <TermAccordion level={parentTerm ? 2 : 1} term={subTerm} />
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default Hierarchy;
