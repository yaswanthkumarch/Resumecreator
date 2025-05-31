
import React from 'react';
import { Card } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { TwoColumnTemplate } from './templates/TwoColumnTemplate';

export function ResumePreview() {
  const { resumeData } = useResume();
  const { selectedTemplate } = resumeData;

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'minimalist':
        return <MinimalistTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'compact':
        return <CompactTemplate data={resumeData} />;
      case 'two-column':
        return <TwoColumnTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <Card className="m-4 print-page">
        <div className="min-h-[11in] bg-white text-black">
          {renderTemplate()}
        </div>
      </Card>
    </div>
  );
}
