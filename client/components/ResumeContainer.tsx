import React from 'react';
import dynamic from 'next/dynamic';
import { Resume } from '../types/types';

const PDFViewer = dynamic(() => import('../components/PDFViewer'), {
  ssr: false,
});

interface ResumeContainerProps {
  resume: Resume;
  onClick: () => void;
}

export const ResumeContainer: React.FC<ResumeContainerProps> = ({
  resume,
  onClick,
}) => {
  return (
    <div
      className="mx-auto border-4 rounded-2xl hover:border-indigo-600 overflow-hidden p-4 bg-white cursor-pointer"
      onClick={onClick}
    >
      <PDFViewer resume={resume} />
    </div>
  );
};
