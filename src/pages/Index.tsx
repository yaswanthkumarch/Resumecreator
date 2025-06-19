import React, { useState } from 'react';

import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { MobileSidebar } from '@/components/MobileSidebar';
import { ResumePreview } from '@/components/preview/ResumePreview';

import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { SummaryForm } from '@/components/forms/SummaryForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { ExperienceForm } from '@/components/forms/ExperienceForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { ProjectsForm } from '@/components/forms/ProjectsForm';
import { TemplateSelector } from '@/components/forms/TemplateSelector';
import { TemplateSelectorWithScore } from '@/components/forms/TemplateSelectorWithScore';

import { ResumeProvider } from '@/contexts/ResumeContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Index = () => {
  const [activeSection, setActiveSection] = useState('personal');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'education':
        return <EducationForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'templates':
        return <TemplateSelector />;
      case 'score':
        return <TemplateSelectorWithScore />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <ThemeProvider>
      <ResumeProvider>
        <div className="min-h-screen bg-background text-foreground">
          {/* Navbar */}
          <Navbar />

          {/* Mobile Sidebar */}
          <MobileSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 border-r">
              <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Form Section */}
              <section className="flex-1 lg:max-w-xl border-r overflow-y-auto p-4">
                {renderActiveSection()}
              </section>

              {/* Resume Preview (hide on mobile) */}
              <aside className="hidden lg:block flex-1 bg-muted/30 border-l overflow-y-auto p-4">
                <ResumePreview />
              </aside>
            </main>
          </div>
        </div>
      </ResumeProvider>
    </ThemeProvider>
  );
};

export default Index;
