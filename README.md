# 📝 Resume Editor

A web-based resume editor built with **React** (frontend) and **FastAPI** (backend), allowing users to:
- Upload `.pdf` or `.docx` resumes
- Extract and edit details like name, education, skills, etc.
- Use AI-powered enhancement per section (mocked)
- Save data to the backend
- Download the final resume as `.json`

---

## 🚀 Live Demo

- **Frontend:** [https://resume-editor-zeta.vercel.app](https://resume-editor-zeta.vercel.app)
- **Backend (Render):** [https://resume-backend.onrender.com](https://resume-backend.onrender.com)

---

## 🏗️ Folder Structure

Resume-Editor/
├── resume-editor-frontend/ # React (Vite) + Tailwind frontend
│ ├── src/
│ │ ├── api/ # API functions (resumeApi.ts)
│ │ ├── components/
│ │ │ ├── ResumeEditor.tsx
│ │ │ └── ui/FileUpload.tsx
│ └── public/index.html # HTML template (cleaned for Vite)
│
├── backend/ # FastAPI backend
│ ├── main.py
│ └── requirements.txt

yaml
Copy
Edit
