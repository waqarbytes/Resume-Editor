import pdfplumber
import docx2txt

def extract_from_pdf(file_path):
    with pdfplumber.open(file_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def extract_from_docx(file_path):
    return docx2txt.process(file_path)

def mock_parse_resume(text):
    # Very basic mocked parser (replace with real NLP later)
    return {
        "name": "John Doe",
        "summary": "Experienced software engineer with 5+ years in full-stack development.",
        "education": [
            {"degree": "B.Tech in Computer Science", "institution": "ABC University", "year": "2020"}
        ],
        "experience": [
            {"company": "XYZ Ltd.", "role": "Software Developer", "duration": "2020–2023"}
        ],
        "skills": ["Python", "FastAPI", "React"]
    }
