import React from 'react';
import { Resume } from '../types/types';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  resume: Resume;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ resume }) => {
  const [numPages, setNumPages] = React.useState<number>(0);

  return (
    <Document
      file={resume.resumeFileUrl}
      onLoadSuccess={(e) => setNumPages(e.numPages)}
    >
      {Array.from(new Array(numPages), (_el, i) => (
        <Page key={`${resume.id}-${i}`} pageNumber={i + 1} />
      ))}
    </Document>
  );
};

export default PDFViewer;
