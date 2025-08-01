import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Zap } from "lucide-react";

interface SkillsFormProps {
  data: any;
  onChange: (section: string, data: any) => void;
}

const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const skills = data.skills || [];
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("intermediate");

  const skillLevels = [
    { value: "beginner", label: "Beginner", color: "bg-red-100 text-red-800" },
    { value: "intermediate", label: "Intermediate", color: "bg-yellow-100 text-yellow-800" },
    { value: "advanced", label: "Advanced", color: "bg-blue-100 text-blue-800" },
    { value: "expert", label: "Expert", color: "bg-green-100 text-green-800" }
  ];

  const skillCategories = [
    "Programming Languages",
    "Frameworks & Libraries",
    "Databases",
    "Tools & Software",
    "Cloud Platforms",
    "Design Tools",
    "Languages",
    "Soft Skills",
    "Other"
  ];

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill = {
        id: Date.now(),
        name: newSkill.trim(),
        level: newSkillLevel,
        category: "Other"
      };
      onChange('skills', [...skills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (id: number) => {
    const filtered = skills.filter((skill: any) => skill.id !== id);
    onChange('skills', filtered);
  };

  const updateSkillLevel = (id: number, level: string) => {
    const updated = skills.map((skill: any) =>
      skill.id === id ? { ...skill, level } : skill
    );
    onChange('skills', updated);
  };

  const updateSkillCategory = (id: number, category: string) => {
    const updated = skills.map((skill: any) =>
      skill.id === id ? { ...skill, category } : skill
    );
    onChange('skills', updated);
  };

  const getLevelColor = (level: string) => {
    const levelConfig = skillLevels.find(l => l.value === level);
    return levelConfig?.color || "bg-gray-100 text-gray-800";
  };

  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Skills & Expertise</h3>
      </div>

      {/* Add New Skill */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill name (e.g., JavaScript, Project Management)"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
            </div>
            <div className="md:w-40">
              <Select value={newSkillLevel} onValueChange={setNewSkillLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills List */}
      {skills.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center">
            <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No skills added yet</p>
            <p className="text-sm text-muted-foreground">
              Add your technical and soft skills to showcase your expertise
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]: [string, any]) => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  {category}
                  <Badge variant="secondary">{categorySkills.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categorySkills.map((skill: any) => (
                    <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{skill.name}</span>
                          <Badge className={getLevelColor(skill.level)}>
                            {skillLevels.find(l => l.value === skill.level)?.label}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Select
                          value={skill.level}
                          onValueChange={(value) => updateSkillLevel(skill.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {skillLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Select
                          value={skill.category}
                          onValueChange={(value) => updateSkillCategory(skill.id, value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {skillCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Add Suggestions */}
      {skills.length < 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Popular Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "JavaScript", "Python", "React", "Node.js", "SQL", "Git",
                "Communication", "Leadership", "Problem Solving", "Project Management"
              ].filter(skill => !skills.some((s: any) => s.name.toLowerCase() === skill.toLowerCase())).map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNewSkill(skill);
                    setTimeout(addSkill, 100);
                  }}
                  className="text-xs"
                >
                  + {skill}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillsForm;