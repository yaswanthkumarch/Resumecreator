import React from 'react';
import { Card } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { TwoColumnTemplate } from './templates/TwoColumnTemplate';

const premiumTemplates = ['executive', 'professional'];

export function ResumePreview() {
  const { resumeData } = useResume();
  const { selectedTemplate } = resumeData;

  const isPremium = premiumTemplates.includes(selectedTemplate);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
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
    <div className="mt-8 mx-auto w-full px-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📄 Resume Preview</h2>

      {/* Show locked message if premium */}
      {isPremium ? (
        <div className="text-center p-10 border rounded-lg shadow bg-yellow-50 text-yellow-900">
          <h2 className="text-2xl font-bold mb-4">🔒 Premium Template Locked</h2>
          <p className="mb-6 text-lg">
            You have selected a premium template. Preview is locked until you upgrade your plan.
          </p>
          <p className="text-sm text-gray-600">
            Contact us at{' '}
            <a href="mailto:yaswanthchennareddy25@gmail.com" className="underline">
              yaswanthchennareddy25@gmail.com
            </a>{' '}
            or call 7989288815 for more info.
          </p>
        </div>
      ) : (
        // Resume Preview Container
        <div className="overflow-x-auto border rounded-lg shadow bg-background">
          <div className="min-w-[850px] max-w-[1100px] mx-auto max-h-[90vh]">
            <Card className="m-4 print-page min-h-[11in] w-full">
              <div className="bg-white text-black p-6">{renderTemplate()}</div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
