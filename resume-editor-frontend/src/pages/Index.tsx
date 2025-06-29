import React, { useState } from "react";
import {
  Upload,
  Save,
  Download,
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface Resume {
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
}

const Index = () => {
  const [resume, setResume] = useState<Resume>({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: []
  });

  const [skillInput, setSkillInput] = useState("");

  const handleFileClick = () => {
    const fileInput = document.getElementById("resume-upload") as HTMLInputElement;
    fileInput?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({ title: "Invalid File", description: "Upload a PDF or DOCX.", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      toast({ title: "Uploading...", description: "Parsing resume..." });

      const res = await fetch("https://resume-editor-zv17.onrender.com/upload-resume", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setResume({
        name: data.name || "",
        email: "",
        phone: "",
        summary: data.summary || "",
        skills: data.skills || [],
      });

      toast({ title: "Resume Loaded", description: "Fields are ready to edit." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to upload.", variant: "destructive" });
    }
  };

  const saveResume = async () => {
    try {
      await fetch("https://resume-editor-zv17.onrender.com/save-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });
      toast({ title: "Saved", description: "Resume saved to backend." });
    } catch (err) {
      toast({ title: "Error", description: "Could not save.", variant: "destructive" });
    }
  };

  const downloadResume = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const addSkill = () => {
    if (skillInput.trim() && !resume.skills.includes(skillInput.trim())) {
      setResume(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setResume(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Resume Editor</h1>

      <Card className="mb-4 border-2 border-dashed border-blue-300">
        <CardContent className="text-center p-6">
          <Upload className="mx-auto h-10 w-10 text-blue-600 mb-2" />
          <p className="text-gray-600">Upload PDF or DOCX to begin editing</p>
          <input type="file" accept=".pdf,.docx" className="hidden" id="resume-upload" onChange={handleFileUpload} />
          <Button onClick={handleFileClick} className="mt-3">Choose File</Button>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Full Name" value={resume.name} onChange={e => setResume({ ...resume, name: e.target.value })} />
          <Input placeholder="Email" value={resume.email} onChange={e => setResume({ ...resume, email: e.target.value })} />
          <Input placeholder="Phone" value={resume.phone} onChange={e => setResume({ ...resume, phone: e.target.value })} />
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Summary</CardTitle>
          <Button variant="outline" size="sm" onClick={() => enhanceWithAI("summary")}> <Sparkles className="h-4 w-4 mr-1" /> Enhance </Button>
        </CardHeader>
        <CardContent>
          <Textarea value={resume.summary} onChange={e => setResume({ ...resume, summary: e.target.value })} rows={5} />
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-2">
            <Input value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="e.g., JavaScript" />
            <Button onClick={addSkill}><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map(skill => (
              <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                {skill}
                <button className="ml-2 text-red-600" onClick={() => removeSkill(skill)}>&times;</button>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={saveResume} className="bg-green-600 text-white"><Save className="h-4 w-4 mr-2" /> Save</Button>
        <Button onClick={downloadResume} variant="outline"><Download className="h-4 w-4 mr-2" /> Download</Button>
      </div>
    </div>
  );
};

async function enhanceWithAI(section: string) {
  const content = resume[section as keyof Resume];
  const res = await fetch("https://resume-editor-zv17.onrender.com/ai-enhance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section, content }),
  });
  const data = await res.json();
  setResume(prev => ({ ...prev, [section]: data.enhanced }));
}

export default Index;
