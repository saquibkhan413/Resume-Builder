import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">ResumeBuilder</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Create professional resumes with our easy-to-use builder. Choose from templates, customize your design, and download in minutes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/create" className="block text-sm text-muted-foreground hover:text-primary">
                Create Resume
              </Link>
              <Link to="/templates" className="block text-sm text-muted-foreground hover:text-primary">
                Templates
              </Link>
              <Link to="/help" className="block text-sm text-muted-foreground hover:text-primary">
                Help Center
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-sm text-muted-foreground hover:text-primary">
                FAQ
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ResumeBuilder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;