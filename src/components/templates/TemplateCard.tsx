import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, CheckCircle } from "lucide-react";
import { Template } from "@/data/templates";

interface TemplateCardProps {
  template: Template;
  onPreview?: (template: Template) => void;
  onSelect?: (template: Template) => void;
  selectedTemplateId?: string;
}

const TemplateCard = ({ template, onPreview, onSelect, selectedTemplateId }: TemplateCardProps) => {
  const isSelected = selectedTemplateId === template.id;

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${
      isSelected ? 'ring-2 ring-primary shadow-lg' : ''
    }`}>
      <CardContent className="p-0">
        {/* Template Preview */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-t-lg overflow-hidden">
          <img
            src={template.preview}
            alt={`${template.name} template preview`}
            className="w-full h-full object-cover"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
            {onPreview && (
              <Button size="sm" variant="secondary" onClick={() => onPreview(template)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            )}
            {onSelect && (
              <Button size="sm" onClick={() => onSelect(template)}>
                <Download className="w-4 h-4 mr-2" />
                {isSelected ? 'Selected' : 'Use Template'}
              </Button>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {template.popular && (
              <Badge className="bg-orange-500 hover:bg-orange-600">
                Popular
              </Badge>
            )}
            {template.atsOptimized && (
              <Badge className="bg-green-500 hover:bg-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                ATS-Friendly
              </Badge>
            )}
          </div>

          {/* Selection Indicator */}
          {isSelected && (
            <div className="absolute top-2 left-2">
              <div className="bg-primary text-primary-foreground rounded-full p-1">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
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
          {onSelect && (
            <Button 
              className={`w-full ${isSelected ? 'bg-primary' : ''}`} 
              variant={isSelected ? "default" : "outline"}
              onClick={() => onSelect(template)}
            >
              {isSelected ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Selected
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Use This Template
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;