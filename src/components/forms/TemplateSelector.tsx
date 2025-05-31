
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { cn } from '@/lib/utils';

const templates = [
  {
    id: 'modern' as const,
    name: 'Modern',
    description: 'Clean, contemporary design with a professional color scheme',
    preview: 'Modern layout with clean lines and professional styling'
  },
  {
    id: 'classic' as const,
    name: 'Classic',
    description: 'Traditional, conservative design perfect for corporate environments',
    preview: 'Classic professional layout with traditional typography'
  },
  {
    id: 'creative' as const,
    name: 'Creative',
    description: 'Bold, visually appealing design for creative professionals',
    preview: 'Creative layout with unique styling and visual elements'
  },
  {
    id: 'minimalist' as const,
    name: 'Minimalist',
    description: 'Ultra-clean design focusing on typography and white space',
    preview: 'Minimalist layout with elegant simplicity'
  },
  {
    id: 'executive' as const,
    name: 'Executive',
    description: 'Premium design with gold accents for senior professionals',
    preview: 'Executive layout with sophisticated styling'
  },
  {
    id: 'professional' as const,
    name: 'Professional',
    description: 'Corporate design with blue accents and structured layout',
    preview: 'Professional layout with corporate styling'
  },
  {
    id: 'compact' as const,
    name: 'Compact',
    description: 'Space-efficient design that fits more content on one page',
    preview: 'Compact layout maximizing space utilization'
  },
  {
    id: 'two-column' as const,
    name: 'Two-Column',
    description: 'Sidebar layout with contact info and skills on the left',
    preview: 'Two-column layout with dark sidebar'
  }
];

export function TemplateSelector() {
  const { resumeData, dispatch } = useResume();
  const { selectedTemplate } = resumeData;

  const selectTemplate = (template: 'modern' | 'classic' | 'creative' | 'minimalist' | 'executive' | 'professional' | 'compact' | 'two-column') => {
    dispatch({ type: 'SET_TEMPLATE', payload: template });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Choose Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => selectTemplate(template.id)}
              className={cn(
                "border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
                selectedTemplate === template.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-1 bg-primary/60 mx-auto mb-2"></div>
                  <div className="w-12 h-1 bg-muted-foreground/40 mx-auto mb-2"></div>
                  <div className="w-10 h-1 bg-muted-foreground/40 mx-auto mb-4"></div>
                  <div className="grid grid-cols-2 gap-1 w-16 mx-auto">
                    <div className="h-2 bg-muted-foreground/30 rounded"></div>
                    <div className="h-2 bg-muted-foreground/30 rounded"></div>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold mb-2">{template.name}</h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
              {selectedTemplate === template.id && (
                <div className="mt-2 text-xs text-primary font-medium">
                  ✓ Currently Selected
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
