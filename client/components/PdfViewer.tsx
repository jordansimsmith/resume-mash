import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  // TODO: implement page navigation
  const [numPages, setNumPages] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  return (
    <Document file={fileUrl} onLoadSuccess={(e) => setNumPages(e.numPages)}>
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
