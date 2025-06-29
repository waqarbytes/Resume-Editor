from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pdfplumber
import docx
import json

app = FastAPI()

# ✅ CORS config to allow frontend connection (Vercel, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production: use your real domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
stored_resumes = []

# ✅ Extract text from PDF
def extract_text_from_pdf(file: UploadFile):
    with pdfplumber.open(file.file) as pdf:
        return "\n".join(
            page.extract_text() for page in pdf.pages if page.extract_text()
        )

# ✅ Extract text from DOCX
def extract_text_from_docx(file: UploadFile):
    doc = docx.Document(file.file)
    return "\n".join(
        para.text for para in doc.paragraphs if para.text.strip()
    )

# ✅ Upload endpoint
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1].lower()

    try:
        if ext == "pdf":
            text = extract_text_from_pdf(file)
        elif ext == "docx":
            text = extract_text_from_docx(file)
        else:
            return JSONResponse(status_code=400, content={"error": "Unsupported file type"})

        return {
            "name": "Your Name",  # optionally extract this later
            "summary": text[:1500],  # Limit summary to 1500 chars
            "education": [],
            "experience": [],
            "skills": []
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# ✅ Enhance endpoint (mock AI)
@app.post("/ai-enhance")
async def ai_enhance(data: dict):
    section = data.get("section")
    content = data.get("content")

    # Basic mocked AI enhancement
    if isinstance(content, list):
        enhanced = [f"{item} (Enhanced)" for item in content]
    elif isinstance(content, str):
        enhanced = f"{content.strip()} (Enhanced by AI)"
    else:
        enhanced = content

    return {"enhanced": enhanced}

# ✅ Save resume to file and memory
@app.post("/save-resume")
async def save_resume(data: dict):
    stored_resumes.append(data)
    try:
        with open("saved_resume.json", "w") as f:
            json.dump(data, f, indent=2)
        return {"message": "Resume saved successfully"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
