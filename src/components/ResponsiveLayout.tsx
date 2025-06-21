'use client';

import React, { useState } from 'react';
import { MobileSidebar } from './MobileSidebar';
import { Sidebar } from './Sidebar';
import { ResumePreview } from './preview/ResumePreview';

export function ResponsiveLayout() {
  const [activeSection, setActiveSection] = useState('personalInfo');

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Desktop layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <aside className="w-1/4 border-r min-h-screen p-4 bg-gray-50 shadow-sm">
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        </aside>

        {/* Resume Preview */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <ResumePreview />
        </main>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden">
        <MobileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>
    </div>
  );
}
