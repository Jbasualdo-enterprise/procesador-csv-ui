import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './DropZone.css';

function DropZone() {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileType, setFileType] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setErrorMsg('Solo se permiten archivos Excel (.xls, .xlsx) o CSV (.csv)');
      setFileName('');
      setFileSize('');
      setFileType('');
      setFileContent('');
      return;
    }
    setErrorMsg('');

    const file = acceptedFiles[0];
    setFileName(file?.name);
    setFileSize(`${Math.round(file?.size / 1024)} KB`);
    setFileType(file?.type);

    // Solo previsualiza si es CSV
    if (file?.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    } else {
      setFileContent('Previsualización no disponible para este tipo de archivo.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`dropzone${isDragActive ? ' active' : ''}`}
      >
        <input {...getInputProps()} />
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" style={{marginBottom: 12}}>
          <path d="M12 17V3M12 3l-5.5 5.5M12 3l5.5 5.5" stroke="#646cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.5 15.5A5.5 5.5 0 0 1 12 21a5.5 5.5 0 0 1-7.5-5.5" stroke="#aaa" strokeWidth="2"/>
        </svg>
        {isDragActive
          ? <p>Suelta el archivo aquí...</p>
          : <p>Arrastra un archivo Excel/CSV aquí, o haz clic para seleccionar</p>
        }
      </div>

      {errorMsg && (
        <div style={{ color: '#f36d6d', margin: '10px 0', fontWeight: 500 }}>
          {errorMsg}
        </div>
      )}

      {fileName && (
        <div className="file-info">
          <div><strong>Archivo:</strong> {fileName}</div>
          <div><strong>Tamaño:</strong> {fileSize}</div>
          <div><strong>Tipo:</strong> {fileType}</div>
        </div>
      )}
      {fileContent && (
        <div className="file-preview">
          <strong>Previsualización:</strong>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
}

export default DropZone;
