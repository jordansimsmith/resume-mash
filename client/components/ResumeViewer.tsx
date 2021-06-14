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
    <div onClick={onClick}>
      <PdfViewer fileUrl={resumeFileUrl} />
    </div>
  );
};
