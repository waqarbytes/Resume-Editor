import React from "react";
import { uploadResume } from "../../api/resumeApi";


interface FileUploadProps {
  onParsed: (data: any) => void; // function to send parsed resume to parent
}

const FileUpload: React.FC<FileUploadProps> = ({ onParsed }) => {
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const parsedResume = await uploadResume(file);
      console.log("Parsed Resume:", parsedResume);
      onParsed(parsedResume); // pass data up to populate the form
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload or parse the resume.");
    }
  };

  return (
    <div className="file-upload-container">
      <label htmlFor="resume-upload" className="upload-label">
        Upload Resume (.pdf or .docx):
      </label>
      <input
        type="file"
        id="resume-upload"
        accept=".pdf,.docx"
        onChange={onFileChange}
        className="upload-input"
      />
    </div>
  );
};

export default FileUpload;
