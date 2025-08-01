import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Mail, Phone, MapPin } from "lucide-react";

interface ResumePreviewProps {
  data: any;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { personalDetails, workExperience, education, skills } = data;

  const handleDownload = () => {
    // TODO: Implement PDF generation
    console.log("Downloading resume...", data);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01");
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Resume Preview</h3>
        <Button onClick={handleDownload} size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Resume Preview */}
      <div className="bg-white border rounded-lg p-6 shadow-sm min-h-[600px] text-sm">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {personalDetails.fullName || "Your Name"}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-gray-600">
            {personalDetails.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>{personalDetails.email}</span>
              </div>
            )}
            {personalDetails.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{personalDetails.phone}</span>
              </div>
            )}
            {personalDetails.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{personalDetails.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {personalDetails.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalDetails.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp: any, index: number) => (
                <div key={exp.id || index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                    </div>
                    <div className="text-right text-gray-600 text-xs">
                      <p>{formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}</p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm mt-2">
                      {exp.description.split('\n').map((line: string, i: number) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu: any, index: number) => (
                <div key={edu.id || index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-right text-gray-600 text-xs">
                      <p>{formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}</p>
                      {edu.location && <p>{edu.location}</p>}
                    </div>
                  </div>
                  {edu.description && (
                    <div className="text-gray-700 text-sm mt-2">
                      {edu.description.split('\n').map((line: string, i: number) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Skills
            </h2>
            <div className="space-y-3">
              {Object.entries(
                skills.reduce((acc: any, skill: any) => {
                  const category = skill.category || "Other";
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(skill);
                  return acc;
                }, {})
              ).map(([category, categorySkills]: [string, any]) => (
                <div key={category}>
                  <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill: any, index: number) => (
                      <span
                        key={skill.id || index}
                        className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!personalDetails.fullName && workExperience.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg mb-2">Your resume preview will appear here</p>
            <p className="text-sm">Fill out the form sections to see your resume take shape</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;