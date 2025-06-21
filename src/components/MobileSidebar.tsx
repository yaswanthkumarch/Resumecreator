'use client';

import React, { useState, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';
import { ResumePreview } from './preview/ResumePreview';

interface MobileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function MobileSidebar({ activeSection, onSectionChange }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setOpen(false); // Close sidebar on selection
  };

  const togglePreview = () => {
    setShowPreview(true);
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hidePreview = () => {
    setShowPreview(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
   <div className="relative w-full min-h-[1px] bg-gray-50 lg:hidden">

      {/* Sidebar toggle button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="fixed top-4 left-4 z-50 bg-white shadow-md border"
            aria-label="Open sidebar menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>

        {/* Sidebar drawer */}
        <SheetContent side="left" className="w-64 p-0 overflow-y-auto">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Resume Sections</SheetTitle>
          </SheetHeader>

          <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
        </SheetContent>
      </Sheet>

      {/* Preview toggle button */}
      <div className="fixed top-16 left-4 z-50">
        {showPreview ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={hidePreview}
            aria-label="Hide resume preview"
          >
            Hide Preview
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={togglePreview}
            aria-label="Show resume preview"
          >
            Show Preview
          </Button>
        )}
      </div>

      {/* Resume preview section (padding only when visible) */}
      <main className={`${showPreview ? 'pt-20' : 'pt-0'} px-4`} ref={previewRef}>
        {showPreview && <ResumePreview />}
      </main>
    </div>
  );
}
