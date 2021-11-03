import React from "react";
import CurrentTerm from "./CurrentTerm";
import { Box, Container, Typography } from "@material-ui/core";
import { NormalEnd } from "./HierarchyItem";
import HierarchyParents from "./HierarchyParents";
import HierarchyChildren from "./HierarchyChildren";

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
  const parentTerms = props.data.parentTerms
    ? props.data.parentTerms.filter((item) => {
        return item.uri && item.vocabulary;
      })
    : [];
  const subTerms = props.data.subTerms
    ? props.data.subTerms.filter((item) => {
        return item.uri && item.vocabulary;
      })
    : [];

  if (!parentTerms.length && !subTerms.length) return null;
  const current: TermInfo = {
    uri: props.data.uri,
    label: props.data.label,
    vocabulary: props.data.vocabulary,
  };

  const currIndex = props.data.parentTerms ? 1 : 0;
  return (
    <Container>
      <Box py={2} mb={10} px={2} mt={4}>
        <Box borderLeft={4} pr={6} borderColor="primary.main">
          <Box pl={4}>
            <Typography variant="h5">Související pojmy</Typography>
          </Box>
          <Box pl={2}>
            <HierarchyParents
              items={parentTerms}
              level={0}
              vocabularyDefault={current.vocabulary}
            />
            <CurrentTerm
              level={currIndex}
              term={current}
              connector={subTerms.length ? <NormalEnd /> : undefined}
            />
            <HierarchyChildren
              items={subTerms}
              level={currIndex + 1}
              vocabularyDefault={current.vocabulary}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

interface DetailItemWrapperProps {
  title: string;
}

export const DetailItemWrapper: React.FC<DetailItemWrapperProps> = (props) => {
  return (
    <Container>
      <Box py={2} mb={2} px={2} mt={4}>
        <Box borderLeft={4} pr={6} borderColor="primary.main">
          <Box pl={4}>
            <Typography variant="h5">{props.title}</Typography>
          </Box>
          <Box pl={4}>{props.children}</Box>
        </Box>
      </Box>
    </Container>
  );
};
