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
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "../components/ui/use-toast";

// 👇 Interfaces
interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Resume {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

const Index = () => {
  const [resume, setResume] = useState<Resume>({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [isEnhancing, setIsEnhancing] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFileClick = () => {
    const fileInput = document.getElementById("resume-upload") as HTMLInputElement;
    fileInput?.click();
  };

  // ✅ Updated handler to call backend
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please select a PDF or DOCX file.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      toast({ title: "Uploading...", description: "Parsing your resume..." });

      const res = await fetch("https://resume-editor-zv17.onrender.com/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setResume((prev) => ({
        ...prev,
        summary: data.summary || "",
        name: data.name || "",
        experience: data.experience || [],
        education: data.education || [],
        skills: data.skills || [],
      }));

      toast({
        title: "Resume Loaded",
        description: "Resume content has been loaded successfully!",
      });
    } catch (err) {
      toast({
        title: "Upload Failed",
        description: "Could not upload resume. Try again later.",
        variant: "destructive",
      });
    }
  };

  const enhanceWithAI = async (section: string) => {
    setIsEnhancing((prev) => ({ ...prev, [section]: true }));
    try {
      const res = await fetch("https://resume-editor-zv17.onrender.com/ai-enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, content: resume[section as keyof Resume] }),
      });

      const data = await res.json();
      setResume((prev) => ({ ...prev, [section]: data.enhanced }));

      toast({
        title: "AI Enhancement Complete",
        description: `Your ${section} section has been enhanced!`,
      });
    } catch (err) {
      toast({
        title: "Enhancement Failed",
        description: "Could not enhance section.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing((prev) => ({ ...prev, [section]: false }));
    }
  };

  const saveResume = async () => {
    try {
      await fetch("https://resume-editor-zv17.onrender.com/save-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });

      toast({ title: "Resume Saved", description: "Resume has been saved successfully." });
    } catch (err) {
      toast({
        title: "Save Failed",
        description: "Could not save resume.",
        variant: "destructive",
      });
    }
  };

  const downloadResume = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const fileName = `${resume.name.replace(/\s+/g, "_") || "resume"}.json`;

    const link = document.createElement("a");
    link.href = dataUri;
    link.download = fileName;
    link.click();
  };

  // ✂️ Shortened for clarity — keep your rendering for experience, education, skills...

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Resume Editor</h1>
          <p className="text-gray-600">Upload, enhance, and export your resume</p>
        </div>

        {/* 👇 File Upload UI */}
        <Card className="mb-6 border-2 border-dashed border-blue-200">
          <CardContent className="p-6 text-center">
            <Upload className="h-10 w-10 mx-auto mb-3 text-blue-600" />
            <p className="mb-4 text-gray-600">Upload a PDF or DOCX file</p>
            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              id="resume-upload"
              onChange={handleFileUpload}
            />
            <Button onClick={handleFileClick}>Choose File</Button>
          </CardContent>
        </Card>

        {/* ✂️ Render personal info, summary, experience, education, skills (use your current UI) */}

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={saveResume} className="bg-green-600 text-white">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button onClick={downloadResume} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download JSON
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
