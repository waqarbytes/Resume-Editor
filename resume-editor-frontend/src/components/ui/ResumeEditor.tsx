import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { enhanceSection, saveResume } from "../../api/resumeApi";

const ResumeEditor = () => {
    const [resumeData, setResumeData] = useState({
        name: "",
        summary: "",
        education: [],
        experience: [],
        skills: [],
    });

    const handleParsedResume = (data: any) => {
        setResumeData(data);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setResumeData({ ...resumeData, [e.target.name]: e.target.value });
    };

    const handleEnhance = async (sectionName: string, content: any) => {
        try {
            const result = await enhanceSection(sectionName, content);
            if (!result?.enhanced) return;

            if (sectionName === "skills") {
                setResumeData({
                    ...resumeData,
                    skills: result.enhanced.split(",").map((s: string) => s.trim()),
                });
            } else {
                setResumeData({ ...resumeData, [sectionName]: result.enhanced });
            }
        } catch (error) {
            console.error("Enhancement failed", error);
        }
    };

    const downloadAsJSON = (data: any, filename = "resume.json") => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="resume-editor" style={{ padding: "2rem" }}>
            <h2>Resume Editor</h2>

            <FileUpload onParsed={handleParsedResume} />

            <div>
                <label>Name:</label>
                <input name="name" value={resumeData.name} onChange={handleChange} />
            </div>

            <div>
                <label>Summary:</label>
                <textarea
                    name="summary"
                    value={resumeData.summary}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    onClick={() => handleEnhance("summary", resumeData.summary)}
                >
                    Enhance Summary with AI
                </button>
            </div>

            <div>
                <label>Education:</label>
                {resumeData.education.map((edu: any, index: number) => (
                    <div key={index}>
                        <input
                            value={edu.degree}
                            onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[index].degree = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                            }}
                            placeholder="Degree"
                        />
                        <input
                            value={edu.institution}
                            onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[index].institution = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                            }}
                            placeholder="Institution"
                        />
                        <input
                            value={edu.year}
                            onChange={(e) => {
                                const updated = [...resumeData.education];
                                updated[index].year = e.target.value;
                                setResumeData({ ...resumeData, education: updated });
                            }}
                            placeholder="Year"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => handleEnhance("education", resumeData.education)}
                >
                    Enhance Education with AI
                </button>
            </div>

            <div>
                <label>Experience:</label>
                {resumeData.experience.map((exp: any, index: number) => (
                    <div key={index}>
                        <input
                            value={exp.company}
                            onChange={(e) => {
                                const updated = [...resumeData.experience];
                                updated[index].company = e.target.value;
                                setResumeData({ ...resumeData, experience: updated });
                            }}
                            placeholder="Company"
                        />
                        <input
                            value={exp.role}
                            onChange={(e) => {
                                const updated = [...resumeData.experience];
                                updated[index].role = e.target.value;
                                setResumeData({ ...resumeData, experience: updated });
                            }}
                            placeholder="Role"
                        />
                        <input
                            value={exp.duration}
                            onChange={(e) => {
                                const updated = [...resumeData.experience];
                                updated[index].duration = e.target.value;
                                setResumeData({ ...resumeData, experience: updated });
                            }}
                            placeholder="Duration"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => handleEnhance("experience", resumeData.experience)}
                >
                    Enhance Experience with AI
                </button>
            </div>

            <div>
                <label>Skills:</label>
                <input
                    value={resumeData.skills.join(", ")}
                    onChange={(e) =>
                        setResumeData({
                            ...resumeData,
                            skills: e.target.value.split(",").map((s) => s.trim()),
                        })
                    }
                />
                <button
                    type="button"
                    onClick={() =>
                        handleEnhance("skills", resumeData.skills.join(", "))
                    }
                >
                    Enhance Skills with AI
                </button>
            </div>

            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={async () => {
                        try {
                            await saveResume(resumeData);
                            alert("Resume saved to backend!");
                        } catch (error) {
                            console.error("Save failed", error);
                            alert("Failed to save resume");
                        }
                    }}
                >
                    Save Resume
                </button>

                <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => downloadAsJSON(resumeData)}
                >
                    Download as JSON
                </button>
            </div>
        </div>
    );
};

export default ResumeEditor;
