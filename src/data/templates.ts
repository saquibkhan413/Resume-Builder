import modernProfessionalImg from "@/assets/templates/modern-professional.jpg";
import classicExecutiveImg from "@/assets/templates/classic-executive.jpg";
import techSpecialistImg from "@/assets/templates/tech-specialist.jpg";
import minimalCleanImg from "@/assets/templates/minimal-clean.jpg";
import creativeDesignerImg from "@/assets/templates/creative-designer.jpg";
import academicScholarImg from "@/assets/templates/academic-scholar.jpg";

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  preview: string;
  popular: boolean;
  atsOptimized: boolean;
  layout: 'single-column' | 'two-column' | 'header-sidebar';
  colorScheme: 'minimal' | 'professional' | 'modern' | 'creative';
}

export const resumeTemplates: Template[] = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    category: "modern",
    description: "Clean, contemporary design perfect for tech roles and modern industries",
    features: ["ATS-Friendly", "Modern Design", "2-Column Layout", "Skills Highlight"],
    preview: modernProfessionalImg,
    popular: true,
    atsOptimized: true,
    layout: "two-column",
    colorScheme: "modern"
  },
  {
    id: "classic-executive",
    name: "Classic Executive",
    category: "classic",
    description: "Traditional format ideal for senior positions and conservative industries",
    features: ["Professional", "Executive Level", "Traditional", "Single Column"],
    preview: classicExecutiveImg,
    popular: false,
    atsOptimized: true,
    layout: "single-column",
    colorScheme: "professional"
  },
  {
    id: "tech-specialist",
    name: "Tech Specialist",
    category: "modern",
    description: "Perfect for software developers and IT professionals",
    features: ["Tech-Focused", "Skills Highlight", "Modern", "Project Showcase"],
    preview: techSpecialistImg,
    popular: true,
    atsOptimized: true,
    layout: "two-column",
    colorScheme: "modern"
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    category: "minimal",
    description: "Simple and elegant design for any industry",
    features: ["Minimal", "Clean Layout", "Universal", "Easy to Read"],
    preview: minimalCleanImg,
    popular: false,
    atsOptimized: true,
    layout: "single-column",
    colorScheme: "minimal"
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    category: "creative",
    description: "Stylish template for creative professionals while staying ATS-friendly",
    features: ["Creative", "Portfolio Ready", "Visual Impact", "ATS-Safe"],
    preview: creativeDesignerImg,
    popular: true,
    atsOptimized: true,
    layout: "header-sidebar",
    colorScheme: "creative"
  },
  {
    id: "academic-scholar",
    name: "Academic Scholar",
    category: "academic",
    description: "Designed for academic and research positions",
    features: ["Academic", "Research-Focused", "Publications", "Traditional"],
    preview: academicScholarImg,
    popular: false,
    atsOptimized: true,
    layout: "single-column",
    colorScheme: "professional"
  }
];

export const templateCategories = [
  { value: "all", label: "All Templates" },
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "creative", label: "Creative" },
  { value: "minimal", label: "Minimal" },
  { value: "academic", label: "Academic" }
];

export const getTemplateById = (id: string): Template | undefined => {
  return resumeTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  if (category === "all") return resumeTemplates;
  return resumeTemplates.filter(template => template.category === category);
};