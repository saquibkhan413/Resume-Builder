import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Download } from "lucide-react";

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      category: "modern",
      description: "Clean and contemporary design perfect for tech roles",
      features: ["ATS-Friendly", "Modern Design", "2-Column Layout"],
      preview: "/api/placeholder/300/400",
      popular: true
    },
    {
      id: 2,
      name: "Classic Executive",
      category: "classic",
      description: "Traditional format ideal for senior positions",
      features: ["Professional", "Executive Level", "Traditional"],
      preview: "/api/placeholder/300/400",
      popular: false
    },
    {
      id: 3,
      name: "Creative Designer",
      category: "creative",
      description: "Stylish template for creative professionals",
      features: ["Creative", "Portfolio Ready", "Visual Impact"],
      preview: "/api/placeholder/300/400",
      popular: true
    },
    {
      id: 4,
      name: "Minimal Clean",
      category: "minimal",
      description: "Simple and elegant design for any industry",
      features: ["Minimal", "Clean Layout", "Universal"],
      preview: "/api/placeholder/300/400",
      popular: false
    },
    {
      id: 5,
      name: "Tech Specialist",
      category: "modern",
      description: "Perfect for software developers and IT professionals",
      features: ["Tech-Focused", "Skills Highlight", "Modern"],
      preview: "/api/placeholder/300/400",
      popular: true
    },
    {
      id: 6,
      name: "Academic Scholar",
      category: "academic",
      description: "Designed for academic and research positions",
      features: ["Academic", "Research-Focused", "Publications"],
      preview: "/api/placeholder/300/400",
      popular: false
    }
  ];

  const categories = [
    { value: "all", label: "All Templates" },
    { value: "modern", label: "Modern" },
    { value: "classic", label: "Classic" },
    { value: "creative", label: "Creative" },
    { value: "minimal", label: "Minimal" },
    { value: "academic", label: "Academic" }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Resume Templates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of professional, ATS-friendly templates designed to help you land your dream job.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Template Preview */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-4 bg-card rounded-lg shadow-sm p-4">
                    <div className="space-y-3">
                      <div className="h-3 bg-primary/20 rounded w-2/3"></div>
                      <div className="space-y-1">
                        <div className="h-2 bg-muted rounded w-full"></div>
                        <div className="h-2 bg-muted rounded w-3/4"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-muted rounded w-full"></div>
                        <div className="h-2 bg-muted rounded w-5/6"></div>
                        <div className="h-2 bg-muted rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" asChild>
                      <Link to="/create">
                        <Download className="w-4 h-4 mr-2" />
                        Use Template
                      </Link>
                    </Button>
                  </div>

                  {/* Popular Badge */}
                  {template.popular && (
                    <Badge className="absolute top-2 right-2">
                      Popular
                    </Badge>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full" asChild>
                    <Link to="/create">
                      Use This Template
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Can't Find the Perfect Template?
          </h2>
          <p className="text-muted-foreground mb-6">
            Start with any template and customize it to match your style and industry needs.
          </p>
          <Button size="lg" asChild>
            <Link to="/create">Create Custom Resume</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Templates;