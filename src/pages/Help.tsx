import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, BookOpen, Video, FileText, Mail } from "lucide-react";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How do I create a new resume?",
      answer: "Click on 'Create Resume' in the navigation menu and follow our step-by-step builder. You'll be guided through entering your personal details, work experience, education, and skills.",
      category: "Getting Started"
    },
    {
      question: "Can I edit my resume after creating it?",
      answer: "Yes! Go to 'My Resumes' to see all your saved resumes. Click 'Edit' on any resume to make changes. Your changes are automatically saved.",
      category: "Editing"
    },
    {
      question: "What file formats can I download my resume in?",
      answer: "You can download your resume as a PDF or Word document. PDF is recommended for most applications as it preserves formatting across different devices.",
      category: "Download"
    },
    {
      question: "Are the resume templates ATS-friendly?",
      answer: "Yes! All our templates are designed to be ATS (Applicant Tracking System) friendly, ensuring your resume gets past automated screening systems.",
      category: "Templates"
    },
    {
      question: "How many resumes can I create?",
      answer: "You can create unlimited resumes with your account. This allows you to customize different versions for different job applications.",
      category: "Account"
    },
    {
      question: "Can I import my LinkedIn profile?",
      answer: "Yes, you can import your basic information from LinkedIn to speed up the resume creation process. This feature is available in the personal details section.",
      category: "Import"
    }
  ];

  const resources = [
    {
      title: "Resume Writing Guide",
      description: "Complete guide to writing effective resumes",
      icon: BookOpen,
      type: "Article"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for using our platform",
      icon: Video,
      type: "Video"
    },
    {
      title: "Template Gallery",
      description: "Explore all available resume templates",
      icon: FileText,
      type: "Gallery"
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Help Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and get help with creating your perfect resume
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Resources */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Quick Resources</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {resources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <resource.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <Badge variant="secondary">{resource.type}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              
              {filteredFaqs.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      No FAQs found matching your search. Try different keywords or browse all questions.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <Card key={index}>
                      <AccordionItem value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <div className="flex items-start justify-between w-full">
                            <span className="text-left font-medium">{faq.question}</span>
                            <Badge variant="outline" className="ml-2 shrink-0">
                              {faq.category}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  ))}
                </Accordion>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Need More Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Your name" />
                <Input placeholder="Your email" type="email" />
                <Input placeholder="Subject" />
                <Textarea placeholder="How can we help you?" rows={4} />
                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "How to write a compelling resume summary",
                  "Best practices for listing work experience",
                  "Common resume mistakes to avoid",
                  "Optimizing your resume for ATS systems"
                ].map((article, index) => (
                  <div key={index} className="pb-3 border-b last:border-b-0">
                    <a href="#" className="text-sm hover:text-primary transition-colors">
                      {article}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;