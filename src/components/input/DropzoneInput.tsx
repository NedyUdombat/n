import React, { ReactNode, useEffect, ChangeEvent } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';

interface DropzoneInputProps {
  label: string;
  id: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | null;
}

const DropzoneInput = ({ label, id, name, onChange }: DropzoneInputProps) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  const fileList = (files: FileWithPath[]): ReactNode =>
    files.map((file) => (
      <li key={file.path} className="file-list-item">
        {file.path} - {file.size} bytes
      </li>
    ));

  const handleFileUpload = (files: FileWithPath[]) => {
    const e = new Event('input', { bubbles: true });
    Object.defineProperty(e, 'target', {
      writable: false,
      value: {
        name: name,
        value: files,
      },
    });

    onChange(e as unknown as ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    fileList(acceptedFiles);
    handleFileUpload(acceptedFiles);
  }, [acceptedFiles]);

  return (
    <div className="form-control-group dropzone-container">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <p className="info">Upload or sign with a digital pen</p>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input id={id} {...getInputProps()} />
        <p className="info">
          Drag and drop your signature or{' '}
          <span className="upload-trigger">upload</span>
        </p>
      </div>
      <ul className="file-lists">{fileList(acceptedFiles)}</ul>
    </div>
  );
};

export default DropzoneInput;
