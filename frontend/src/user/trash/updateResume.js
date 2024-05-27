import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function UpdateResume() {
    const[fileUrl, setFileUrl] = useState(null);

    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            console.log(fileURL);
            setFileUrl(fileURL);
        }
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={onFileChange} />
            {fileUrl && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer fileUrl={fileUrl} />
                </Worker>
            )}
        </div>
    );
}

export default UpdateResume;