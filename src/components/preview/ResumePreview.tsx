'use client';

import React, { useState, useEffect } from 'react';
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
  const [showMessage, setShowMessage] = useState(false);

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

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div className="mt-8 mx-auto w-full px-4 relative max-w-screen-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📄 Resume Preview</h2>

      {isPremium ? (
        <div className="text-center p-10 border rounded-lg shadow-lg bg-yellow-50 text-yellow-900 relative z-10 max-w-md mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-extrabold text-yellow-800">Shiva Technologies</h1>
            <p className="text-sm text-yellow-700 font-medium tracking-wide">
              Innovating the Future, One Template at a Time
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">🔒 Premium Template Locked</h2>
          <p className="mb-6 text-lg font-medium">
            You’ve selected a premium template by{' '}
            <span className="font-bold text-yellow-800">Shiva Technologies</span>. Upgrade your plan to unlock full access.
          </p>

          <p className="text-sm text-gray-700">
            <button
              onClick={() => setShowMessage(true)}
              className="underline font-semibold text-yellow-800 hover:text-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-600 rounded"
              aria-label="Contact our team"
            >
              Contact our team
            </button>
          </p>
        </div>
      ) : (
        <div className="overflow-auto border rounded-lg shadow bg-background max-w-full">
          <div className="w-full max-w-[1100px] mx-auto max-h-[90vh]">
            <Card className="m-4 print-page min-h-[11in] w-full">
              <div className="bg-white text-black p-6">{renderTemplate()}</div>
            </Card>
          </div>
        </div>
      )}

      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-green-100 text-green-800 px-8 py-6 rounded-lg shadow-lg text-lg font-medium max-w-sm text-center">
            ✅ Our team is currently working on this. Thank you for staying with us!
          </div>
        </div>
      )}
    </div>
  );
}
