
import React from 'react';
import { Card } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

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
