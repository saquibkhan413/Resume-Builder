import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ResumeData {
  selectedTemplate?: any;
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  workExperience: any[];
  education: any[];
  skills: any[];
}

export class PDFGenerator {
  static async generatePDF(resumeData: ResumeData): Promise<void> {
    try {
      // Create a temporary div with the resume content
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '8.5in';
      tempDiv.style.minHeight = '11in';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.padding = '0.5in';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '12px';
      tempDiv.style.lineHeight = '1.4';
      tempDiv.style.color = '#000';

      // Generate HTML content based on resume data
      tempDiv.innerHTML = this.generateResumeHTML(resumeData);
      
      document.body.appendChild(tempDiv);

      // Convert to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 816, // 8.5 inches * 96 DPI
        height: 1056, // 11 inches * 96 DPI
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      const imgWidth = 595; // A4 width in points
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Generate filename
      const fileName = `${resumeData.personalDetails.fullName || 'Resume'}_Resume.pdf`.replace(/\s+/g, '_');
      
      // Download the PDF
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF. Please try again.');
    }
  }

  private static generateResumeHTML(data: ResumeData): string {
    const { personalDetails, workExperience, education, skills } = data;

    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString + '-01');
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    return `
      <div style="max-width: 100%; margin: 0; padding: 0;">
        <!-- Header -->
        <div style="border-bottom: 2px solid #333; padding-bottom: 12px; margin-bottom: 20px;">
          <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold; color: #000;">
            ${personalDetails.fullName || 'Your Name'}
          </h1>
          <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 11px; color: #666;">
            ${personalDetails.email ? `<span>📧 ${personalDetails.email}</span>` : ''}
            ${personalDetails.phone ? `<span>📞 ${personalDetails.phone}</span>` : ''}
            ${personalDetails.location ? `<span>📍 ${personalDetails.location}</span>` : ''}
          </div>
        </div>

        ${personalDetails.summary ? `
        <!-- Professional Summary -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 16px; font-weight: bold; color: #000; margin: 0 0 8px 0; border-bottom: 1px solid #ddd; padding-bottom: 4px;">
            Professional Summary
          </h2>
          <p style="margin: 0; font-size: 11px; line-height: 1.5; color: #333;">
            ${personalDetails.summary}
          </p>
        </div>
        ` : ''}

        ${workExperience.length > 0 ? `
        <!-- Work Experience -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 16px; font-weight: bold; color: #000; margin: 0 0 12px 0; border-bottom: 1px solid #ddd; padding-bottom: 4px;">
            Work Experience
          </h2>
          ${workExperience.map((exp: any) => `
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <div>
                  <h3 style="margin: 0; font-size: 13px; font-weight: bold; color: #000;">${exp.jobTitle}</h3>
                  <p style="margin: 0; font-size: 12px; color: #666;">${exp.company}</p>
                </div>
                <div style="text-align: right; font-size: 10px; color: #666;">
                  <p style="margin: 0;">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                  ${exp.location ? `<p style="margin: 0;">${exp.location}</p>` : ''}
                </div>
              </div>
              ${exp.description ? `
                <div style="font-size: 11px; color: #333; margin-top: 6px;">
                  ${exp.description.split('\n').map((line: string) => `<p style="margin: 2px 0;">${line}</p>`).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${education.length > 0 ? `
        <!-- Education -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 16px; font-weight: bold; color: #000; margin: 0 0 12px 0; border-bottom: 1px solid #ddd; padding-bottom: 4px;">
            Education
          </h2>
          ${education.map((edu: any) => `
            <div style="margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <div>
                  <h3 style="margin: 0; font-size: 13px; font-weight: bold; color: #000;">
                    ${edu.degree} ${edu.field ? `in ${edu.field}` : ''}
                  </h3>
                  <p style="margin: 0; font-size: 12px; color: #666;">${edu.institution}</p>
                  ${edu.gpa ? `<p style="margin: 0; font-size: 10px; color: #666;">GPA: ${edu.gpa}</p>` : ''}
                </div>
                <div style="text-align: right; font-size: 10px; color: #666;">
                  <p style="margin: 0;">${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate)}</p>
                  ${edu.location ? `<p style="margin: 0;">${edu.location}</p>` : ''}
                </div>
              </div>
              ${edu.description ? `
                <div style="font-size: 11px; color: #333; margin-top: 6px;">
                  ${edu.description.split('\n').map((line: string) => `<p style="margin: 2px 0;">${line}</p>`).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${skills.length > 0 ? `
        <!-- Skills -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 16px; font-weight: bold; color: #000; margin: 0 0 12px 0; border-bottom: 1px solid #ddd; padding-bottom: 4px;">
            Skills
          </h2>
          ${Object.entries(
            skills.reduce((acc: any, skill: any) => {
              const category = skill.category || 'Other';
              if (!acc[category]) acc[category] = [];
              acc[category].push(skill);
              return acc;
            }, {})
          ).map(([category, categorySkills]: [string, any]) => `
            <div style="margin-bottom: 8px;">
              <h3 style="margin: 0 0 4px 0; font-size: 12px; font-weight: bold; color: #000;">${category}</h3>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${categorySkills.map((skill: any) => `
                  <span style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 10px; color: #333;">
                    ${skill.name}
                  </span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    `;
  }
}