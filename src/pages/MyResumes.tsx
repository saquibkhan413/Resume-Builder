import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Download, Edit, Copy, Trash2, FileText } from "lucide-react";

const MyResumes = () => {
  const [resumes] = useState([
    {
      id: 1,
      name: "Software Engineer Resume",
      template: "Modern Professional",
      lastModified: "2 hours ago",
      status: "completed",
      downloads: 5
    },
    {
      id: 2,
      name: "Product Manager CV",
      template: "Executive Classic",
      lastModified: "1 day ago", 
      status: "draft",
      downloads: 0
    },
    {
      id: 3,
      name: "Frontend Developer",
      template: "Tech Specialist",
      lastModified: "3 days ago",
      status: "completed",
      downloads: 12
    }
  ]);

  const getStatusColor = (status: string) => {
    return status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">My Resumes</h1>
            <p className="text-muted-foreground">
              Manage and download your professional resumes
            </p>
          </div>
          <Button asChild>
            <Link to="/create">
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Link>
          </Button>
        </div>

        {/* Empty State or Resume List */}
        {resumes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first professional resume to get started
              </p>
              <Button asChild>
                <Link to="/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Resume
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{resumes.length}</div>
                  <div className="text-sm text-muted-foreground">Total Resumes</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">
                    {resumes.filter(r => r.status === "completed").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">
                    {resumes.reduce((sum, r) => sum + r.downloads, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Downloads</div>
                </CardContent>
              </Card>
            </div>

            {/* Resume Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card key={resume.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-1">{resume.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {resume.template}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Resume Preview */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg mb-4 p-3">
                      <div className="bg-card h-full rounded shadow-sm p-3">
                        <div className="space-y-2">
                          <div className="h-2 bg-primary/20 rounded w-2/3"></div>
                          <div className="space-y-1">
                            <div className="h-1.5 bg-muted rounded w-full"></div>
                            <div className="h-1.5 bg-muted rounded w-3/4"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="h-1.5 bg-muted rounded w-full"></div>
                            <div className="h-1.5 bg-muted rounded w-5/6"></div>
                            <div className="h-1.5 bg-muted rounded w-4/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resume Info */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last modified</span>
                        <span>{resume.lastModified}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(resume.status)}>
                          {resume.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {resume.downloads} downloads
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1" asChild>
                          <Link to={`/edit/${resume.id}`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyResumes;