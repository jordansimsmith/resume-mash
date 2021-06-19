import { Box } from '@chakra-ui/react';
import React from 'react';
import PdfViewer from './PdfViewer';

interface ResumeViewerProps {
  resumeFileUrl: string;
  onClick: () => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  resumeFileUrl,
  onClick,
}) => {
  return (
    <Box
      border="4px"
      borderColor="gray.200"
      borderRadius="xl"
      overflow="hidden"
      cursor="pointer"
      _hover={{
        borderColor: 'purple.400',
      }}
      onClick={onClick}
    >
      <PdfViewer fileUrl={resumeFileUrl} />
    </Box>
  );
};
