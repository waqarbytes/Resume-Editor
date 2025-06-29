from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import os
import pdfplumber
import docx
import json

app = FastAPI()

# ✅ Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production: replace with ['https://resume-editor.vercel.app']
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy in-memory store
stored_resumes = []

# Utility: Extract text from PDF
def extract_text_from_pdf(file: UploadFile):
    text = ""
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

# Utility: Extract text from DOCX
def extract_text_from_docx(file: UploadFile):
    doc = docx.Document(file.file)
    return "\n".join([para.text for para in doc.paragraphs])

# Mock parser to structure resume data
def mock_parse_resume(text: str):
    return {
        "name": "John Doe",
        "summary": "Experienced software developer with expertise in React and FastAPI.",
        "education": [
            {"degree": "B.Tech", "institution": "XYZ University", "year": "2022"}
        ],
        "experience": [
            {"company": "ABC Corp", "role": "Frontend Developer", "duration": "2 years"}
        ],
        "skills": ["React", "JavaScript", "FastAPI", "HTML", "CSS"]
    }

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1]
    if ext == "pdf":
        text = extract_text_from_pdf(file)
    elif ext == "docx":
        text = extract_text_from_docx(file)
    else:
        return JSONResponse(status_code=400, content={"error": "Unsupported file type"})

    parsed = mock_parse_resume(text)
    return parsed

@app.post("/ai-enhance")
async def ai_enhance(data: dict):
    section = data.get("section")
    content = data.get("content")

    # Mock enhancement
    if isinstance(content, list):
        enhanced = content  # could add mock AI improvements here
    elif isinstance(content, str):
        enhanced = f"{content.strip()} (Enhanced by AI)"
    else:
        enhanced = content

    return {"enhanced": enhanced}

@app.post("/save-resume")
async def save_resume(data: dict):
    stored_resumes.append(data)
    with open("saved_resume.json", "w") as f:
        json.dump(data, f, indent=2)
    return {"message": "Resume saved successfully"}
