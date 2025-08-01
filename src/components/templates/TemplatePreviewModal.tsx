import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, X } from "lucide-react";
import { Template } from "@/data/templates";

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (template: Template) => void;
}

const TemplatePreviewModal = ({ template, isOpen, onClose, onSelect }: TemplatePreviewModalProps) => {
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-2xl">{template.name}</DialogTitle>
            <p className="text-muted-foreground mt-1">{template.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 flex gap-6">
          {/* Preview */}
          <div className="flex-1 bg-muted/30 rounded-lg p-4 overflow-auto">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
              <img
                src={template.preview}
                alt={`${template.name} full preview`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="w-80 space-y-6">
            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {template.features.map((feature) => (
                  <Badge key={feature} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Template Details */}
            <div>
              <h3 className="font-semibold mb-3">Template Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="capitalize">{template.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Layout:</span>
                  <span className="capitalize">{template.layout.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color Scheme:</span>
                  <span className="capitalize">{template.colorScheme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ATS Optimized:</span>
                  <Badge variant={template.atsOptimized ? "default" : "secondary"}>
                    {template.atsOptimized ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Best For */}
            <div>
              <h3 className="font-semibold mb-3">Best For</h3>
              <div className="text-sm text-muted-foreground">
                {template.category === "modern" && "Tech professionals, startups, creative industries"}
                {template.category === "classic" && "Traditional industries, senior positions, corporate roles"}
                {template.category === "creative" && "Design, marketing, creative professionals"}
                {template.category === "minimal" && "Any industry, clean aesthetic preference"}
                {template.category === "academic" && "Research positions, academia, scientific roles"}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {onSelect && (
                <Button className="w-full" onClick={() => onSelect(template)}>
                  <Download className="w-4 h-4 mr-2" />
                  Use This Template
                </Button>
              )}
              <Button variant="outline" className="w-full" onClick={onClose}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;