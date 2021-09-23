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
  const current: TermInfo = {
    uri: props.data.uri,
    label: props.data.label,
    vocabulary: props.data.vocabulary,
  };

  const parentTerms = props.data.parentTerms?.map((item) => {
    return <TermAccordion level={0} term={item} key={item.uri} />;
  });
  const currentTerm = (
    <CurrentTerm level={parentTerms ? 1 : 0} term={current} />
  );
  const subTerms = props.data.subTerms?.map((item) => {
    return (
      <TermAccordion level={parentTerms ? 2 : 1} term={item} key={item.uri} />
    );
  });

  if (!parentTerms && !subTerms.length) return null;

  return (
    <Container>
      <Box py={2} mb={10} px={2} mt={2}>
        <Box borderLeft={4} pr={6} borderColor="primary.main">
          <Box pl={4}>
            <Typography variant="h4">Hierarchie</Typography>
          </Box>
          {parentTerms}
          {currentTerm}
          {subTerms}
        </Box>
      </Box>
    </Container>
  );
};
export default Hierarchy;
