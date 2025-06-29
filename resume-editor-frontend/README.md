📝 Resume Editor (Full Stack)
A web-based resume editor where users can:

Upload their .pdf or .docx resume
Auto-extract and edit fields like name, summary, education, etc.
Enhance content using AI suggestions (mocked FastAPI backend)
Save their resume to the backend or download as .json
🚀 Live Demo
Frontend: https://resume-editor.vercel.app
Backend: https://resume-backend.onrender.com
📁 Folder Structure
├── frontend/ # React (Vite) + TypeScript │ ├── src/ │ │ ├── components/ │ │ │ ├── ResumeEditor.tsx │ │ │ ├── FileUpload.tsx │ │ ├── api/resumeApi.ts │ │ ├── App.tsx │ └── index.html │ ├── backend/ # FastAPI app │ ├── main.py │ ├── requirements.txt