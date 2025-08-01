import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import PersonalDetailsForm from "@/components/resume/PersonalDetailsForm";
import WorkExperienceForm from "@/components/resume/WorkExperienceForm";
import EducationForm from "@/components/resume/EducationForm";
import SkillsForm from "@/components/resume/SkillsForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { getTemplateById } from "@/data/templates";

const CreateResume = () => {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const selectedTemplate = templateId ? getTemplateById(templateId) : null;
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState({
    selectedTemplate: selectedTemplate,
    personalDetails: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: ""
    },
    workExperience: [],
    education: [],
    skills: []
  });

  // Update template when URL changes
  useEffect(() => {
    if (selectedTemplate && selectedTemplate.id !== resumeData.selectedTemplate?.id) {
      setResumeData(prev => ({ ...prev, selectedTemplate }));
    }
  }, [selectedTemplate, resumeData.selectedTemplate?.id]);

  const steps = [
    { title: "Personal Details", component: PersonalDetailsForm },
    { title: "Work Experience", component: WorkExperienceForm },
    { title: "Education", component: EducationForm },
    { title: "Skills", component: SkillsForm },
    { title: "Preview & Download", component: ResumePreview }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataChange = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Create Your Resume</h1>
            {selectedTemplate && (
              <span className="text-sm text-muted-foreground">
                • Using {selectedTemplate.name} template
              </span>
            )}
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Steps Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  index === currentStep
                    ? "bg-primary-foreground text-primary"
                    : index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-foreground text-muted"
                }`}>
                  {index + 1}
                </div>
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CurrentComponent
                  data={resumeData}
                  onChange={handleDataChange}
                />
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResumePreview data={resumeData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResume;