const API_BASE = "http://127.0.0.1:8000";

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload-resume`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function enhanceSection(section, content) {
  const res = await fetch(`${API_BASE}/ai-enhance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section, content }),
  });
  return res.json();
}

export async function saveResume(resume_id, data) {
  const res = await fetch(`${API_BASE}/save-resume`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume_id, data }),
  });
  return res.json();
}

export async function getResume(resume_id) {
  const res = await fetch(`${API_BASE}/get-resume/${resume_id}`);
  return res.json();
}
