
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
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <ThemeProvider>
      <ResumeProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          
          <div className="flex h-[calc(100vh-4rem)]">
            <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
            <MobileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
            
            {/* Main Content */}
            <div className="flex-1 flex">
              {/* Form Panel */}
              <div className="flex-1 overflow-y-auto p-6 lg:max-w-xl">
                {renderActiveSection()}
              </div>
              
              {/* Preview Panel */}
              <div className="hidden lg:block flex-1 border-l bg-muted/30">
                <div className="sticky top-0 h-[calc(100vh-4rem)]">
                  <ResumePreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ResumeProvider>
    </ThemeProvider>
  );
};

export default Index;
