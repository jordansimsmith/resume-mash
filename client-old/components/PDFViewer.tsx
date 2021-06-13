import React from 'react';
import { Resume } from '../types/types';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  resume: Resume;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ resume }) => {
  // TODO: implement page navigation
  const [numPages, setNumPages] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  return (
    <Document
      file={resume.resumeFileUrl}
      onLoadSuccess={(e) => setNumPages(e.numPages)}
    >
      <Page
        pageNumber={currentPage}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        width={1000}
        renderMode="canvas"
      />
    </Document>
  );
};

export default PDFViewer;
