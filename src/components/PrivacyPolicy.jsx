import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Pdf from "../assets/Verve's Privacy Policy.pdf"

// This is required for worker files to render PDFs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PrivacyPolicy = () => {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Document file={Pdf}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PrivacyPolicy;
