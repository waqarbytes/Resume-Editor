import React, { useState } from 'react';
import { Upload, Download, Save, Plus, Trash2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

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
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: [],
    education: [],
    skills: []
  });

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [skillInput, setSkillInput] = useState('');
  const [isEnhancing, setIsEnhancing] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input triggered');
    const file = event.target.files?.[0];
    console.log('Selected file:', file);
    
    if (file) {
      console.log('File details:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please select a PDF or DOCX file.",
          variant: "destructive"
        });
        return;
      }
      
      // Mock parsing - simulate loading resume data
      toast({
        title: "Resume Uploaded",
        description: "Parsing your resume... (Demo mode with sample data)"
      });
      
      // Simulate parsing delay and populate with sample data
      setTimeout(() => {
        setResume({
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "(555) 123-4567",
          summary: "Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.",
          experience: [
            {
              id: '1',
              company: "Tech Solutions Inc.",
              position: "Senior Software Developer",
              startDate: "2021-03",
              endDate: "Present",
              description: "Lead development of web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions."
            }
          ],
          education: [
            {
              id: '1',
              institution: "University of Technology",
              degree: "Bachelor of Science in Computer Science",
              startDate: "2016-09",
              endDate: "2020-05",
              description: "Graduated Magna Cum Laude with focus on software engineering and algorithms."
            }
          ],
          skills: ["JavaScript", "React", "Node.js", "Python", "SQL"]
        });
        toast({
          title: "Resume Loaded",
          description: "Your resume has been successfully parsed and loaded!"
        });
      }, 2000);
    } else {
      console.log('No file selected');
    }
  };

  const handleFileClick = () => {
    console.log('File upload area clicked');
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const removeExperience = (id: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResume(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const removeEducation = (id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !resume.skills.includes(skillInput.trim())) {
      setResume(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const enhanceWithAI = async (section: string) => {
    setIsEnhancing(prev => ({ ...prev, [section]: true }));
    
    try {
      // Mock AI enhancement - simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock enhanced content
      const enhancements: Record<string, string> = {
        summary: "Dynamic and results-driven software developer with 5+ years of comprehensive expertise in full-stack development. Proven track record of architecting scalable web applications using cutting-edge technologies including React, Node.js, and cloud platforms. Demonstrated ability to lead cross-functional teams and deliver innovative solutions that drive business growth and enhance user experience.",
        experience: "Enhanced experience descriptions with quantified achievements and impact metrics.",
        education: "Enhanced education section with relevant coursework and academic achievements.",
        skills: "Optimized skills section with industry-relevant technologies and competencies."
      };
      
      if (section === 'summary') {
        setResume(prev => ({
          ...prev,
          summary: enhancements.summary
        }));
      }
      
      toast({
        title: "AI Enhancement Complete",
        description: `Your ${section} section has been enhanced successfully!`
      });
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: "Unable to enhance content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsEnhancing(prev => ({ ...prev, [section]: false }));
    }
  };

  const saveResume = async () => {
    try {
      // Mock API call to save resume
      const response = await fetch('/save-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
      });
      
      toast({
        title: "Resume Saved",
        description: "Your resume has been successfully saved!"
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Unable to save resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadResume = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${resume.name.replace(/\s+/g, '_') || 'resume'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Download Started",
      description: "Your resume JSON file is being downloaded."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Editor</h1>
          <p className="text-gray-600">Create and enhance your professional resume</p>
        </div>

        {/* File Upload */}
        <Card className="mb-8 border-2 border-dashed border-blue-200 hover:border-blue-300 transition-colors">
          <CardContent className="p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
            <p className="text-gray-600 mb-4">Upload a PDF or DOCX file to get started</p>
            <input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <Button 
              onClick={handleFileClick}
              className="cursor-pointer"
            >
              Choose File
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="mb-6 shadow-lg">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('personal')}
          >
            <CardTitle className="text-xl">Personal Information</CardTitle>
            {collapsedSections.personal ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </CardHeader>
          {!collapsedSections.personal && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    value={resume.name}
                    onChange={(e) => setResume(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={resume.email}
                    onChange={(e) => setResume(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input
                  value={resume.phone}
                  onChange={(e) => setResume(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                />
              </div>
            </CardContent>
          )}
        </Card>

        {/* Summary */}
        <Card className="mb-6 shadow-lg">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('summary')}
          >
            <CardTitle className="text-xl">Professional Summary</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  enhanceWithAI('summary');
                }}
                disabled={isEnhancing.summary}
                className="text-blue-600 hover:text-blue-700"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                {isEnhancing.summary ? 'Enhancing...' : 'Enhance with AI'}
              </Button>
              {collapsedSections.summary ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </div>
          </CardHeader>
          {!collapsedSections.summary && (
            <CardContent>
              <Textarea
                value={resume.summary}
                onChange={(e) => setResume(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Write a compelling professional summary..."
                rows={4}
                className="resize-none"
              />
            </CardContent>
          )}
        </Card>

        {/* Experience */}
        <Card className="mb-6 shadow-lg">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('experience')}
          >
            <CardTitle className="text-xl">Work Experience</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  enhanceWithAI('experience');
                }}
                disabled={isEnhancing.experience}
                className="text-blue-600 hover:text-blue-700"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                {isEnhancing.experience ? 'Enhancing...' : 'Enhance with AI'}
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  addExperience();
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Experience
              </Button>
              {collapsedSections.experience ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </div>
          </CardHeader>
          {!collapsedSections.experience && (
            <CardContent className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Experience Entry</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        placeholder="Job title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              {resume.experience.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No experience entries yet. Click "Add Experience" to get started.</p>
                </div>
              )}
            </CardContent>
          )}
        </Card>

        {/* Education */}
        <Card className="mb-6 shadow-lg">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('education')}
          >
            <CardTitle className="text-xl">Education</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  enhanceWithAI('education');
                }}
                disabled={isEnhancing.education}
                className="text-blue-600 hover:text-blue-700"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                {isEnhancing.education ? 'Enhancing...' : 'Enhance with AI'}
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  addEducation();
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Education
              </Button>
              {collapsedSections.education ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </div>
          </CardHeader>
          {!collapsedSections.education && (
            <CardContent className="space-y-6">
              {resume.education.map((edu) => (
                <div key={edu.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Education Entry</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="School or university name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="Degree and field of study"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <Input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <Input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Textarea
                      value={edu.description}
                      onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                      placeholder="Relevant coursework, achievements, or details..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              {resume.education.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No education entries yet. Click "Add Education" to get started.</p>
                </div>
              )}
            </CardContent>
          )}
        </Card>

        {/* Skills */}
        <Card className="mb-8 shadow-lg">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('skills')}
          >
            <CardTitle className="text-xl">Skills</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  enhanceWithAI('skills');
                }}
                disabled={isEnhancing.skills}
                className="text-blue-600 hover:text-blue-700"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                {isEnhancing.skills ? 'Enhancing...' : 'Enhance with AI'}
              </Button>
              {collapsedSections.skills ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </div>
          </CardHeader>
          {!collapsedSections.skills && (
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {resume.skills.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No skills added yet. Type a skill and click the plus button to add it.</p>
                </div>
              )}
            </CardContent>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={saveResume}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Resume
          </Button>
          <Button
            onClick={downloadResume}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
          >
            <Download className="h-5 w-5 mr-2" />
            Download JSON
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
