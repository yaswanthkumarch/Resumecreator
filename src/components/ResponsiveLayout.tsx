// components/ResponsiveLayout.tsx
'use client';
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MobileSidebar } from './MobileSidebar';
import { ResumePreview } from './preview/ResumePreview';

export function ResponsiveLayout() {
  const [activeSection, setActiveSection] = useState('personalInfo');

  return (
    <div className="w-full flex flex-col lg:flex-row min-h-screen bg-white">
      <aside className="hidden lg:block lg:w-64 border-r p-4 bg-gray-50 shadow-sm">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <ResumePreview />
      </main>
      <div className="lg:hidden">
        <MobileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>
    </div>
  );
}
