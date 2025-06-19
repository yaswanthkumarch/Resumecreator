import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { cn } from '@/lib/utils';
import { Info, CheckCircle } from 'lucide-react';

// Template definitions
const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean, contemporary design', preview: '' },
  { id: 'classic', name: 'Classic', description: 'Traditional layout', preview: '' },
  { id: 'creative', name: 'Creative', description: 'Bold and artistic', preview: '' },
  { id: 'minimalist', name: 'Minimalist', description: 'Sleek and simple', preview: '' },
  { id: 'executive', name: 'Executive', description: 'Premium look', preview: '' },
  { id: 'professional', name: 'Professional', description: 'Corporate friendly', preview: '' },
  { id: 'compact', name: 'Compact', description: 'Content-rich, efficient layout', preview: '' },
  { id: 'two-column', name: 'Two-Column', description: 'Sidebar layout', preview: '' },
];

// Role-based recommendations
const recommendedTemplatesByRole: Record<string, string[]> = {
  corporate: ['professional', 'executive', 'modern'],
  creative: ['creative', 'minimalist', 'two-column'],
  technical: ['modern', 'compact', 'two-column'],
  academic: ['classic', 'minimalist', 'professional'],
};

export function TemplateSelectorWithScore() {
  const { resumeData, dispatch } = useResume();
  const { selectedTemplate, roleType = 'corporate' } = resumeData;
  const [score, setScore] = useState<number | null>(null);

  const selectTemplate = (templateId: typeof templates[number]['id']) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  useEffect(() => {
    const result = calculateResumeScore(resumeData);
    setScore(result);
  }, [resumeData]);

  const recommended = recommendedTemplatesByRole[roleType] || recommendedTemplatesByRole['corporate'];
  const recommendedTemplates = templates.filter((template) => recommended.includes(template.id));
  const otherTemplates = templates.filter((template) => !recommended.includes(template.id));

  return (
    <>
      {/* Recommended Templates */}
      <Card className="animate-fade-in shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            🎯 Recommended Templates for "{roleType.charAt(0).toUpperCase() + roleType.slice(1)}"
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTemplates.map((template) =>
              renderTemplateCard(template, selectedTemplate, selectTemplate)
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Other Templates */}
      <Card className="animate-fade-in shadow-md mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            🗂 Other Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherTemplates.map((template) =>
              renderTemplateCard(template, selectedTemplate, selectTemplate)
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resume Score */}
      {score !== null && (
        <Card className="mt-6 animate-fade-in shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              📊 Resume AI Score
              <Info className="w-4 h-4 text-muted-foreground" title="Estimated quality based on key resume sections." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-lg font-semibold text-primary">{score} / 100</div>

              <div className="relative w-full h-4 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${score}%` }}
                />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                This score reflects how well your resume covers key areas like experience, education, skills, and layout
                relevance for your role.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

// Helper: Template Card Renderer
function renderTemplateCard(template, selectedTemplate, onSelect) {
  const isSelected = selectedTemplate === template.id;
  return (
    <div
      key={template.id}
      onClick={() => onSelect(template.id)}
      className={cn(
        'group border rounded-xl p-4 cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] bg-background',
        isSelected
          ? 'border-primary ring-2 ring-primary/40 bg-primary/5'
          : 'border-border hover:border-primary/40'
      )}
    >
      <div className="aspect-[3/4] bg-muted/30 rounded-md mb-3 flex items-center justify-center text-center text-muted-foreground text-xs italic">
        {template.name} Preview
      </div>

      <h3 className="font-semibold text-lg text-gray-900">{template.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>

      {isSelected && (
        <div className="mt-2 text-xs font-medium text-primary flex items-center gap-1">
          <CheckCircle className="w-4 h-4" />
          Currently Selected
        </div>
      )}
    </div>
  );
}

// Resume Score Calculation
function calculateResumeScore(resumeData: any): number {
  let score = 0;

  if (resumeData.contact?.name && resumeData.contact?.email) score += 10;

  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
    score += 25;
    if (resumeData.experience.length >= 3) score += 10;
  }

  if (Array.isArray(resumeData.education) && resumeData.education.length > 0) score += 20;
  if (Array.isArray(resumeData.skills) && resumeData.skills.length > 0) score += 20;

  if (resumeData.selectedTemplate === 'creative' && resumeData.roleType === 'corporate') {
    score -= 10;
  } else {
    score += 5;
  }

  return Math.max(0, Math.min(score, 100));
}
