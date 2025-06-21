// components/MobileSidebar.tsx
'use client';
import React, { useState, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';
import { ResumePreview } from './preview/ResumePreview';

interface Props {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function MobileSidebar({ activeSection, onSectionChange }: Props) {
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSection = (section: string) => {
    onSectionChange(section);
    setOpen(false);
  };

  const togglePreview = () => {
    setShowPreview(prev => {
      const next = !prev;
      if (next) {
        setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return next;
    });
  };

  return (
    <div className="lg:hidden relative bg-gray-50 min-h-[9px]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="fixed top-4 left-4 z-50 bg-white shadow-md border">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 overflow-y-auto">
          <SheetHeader className="p-4 border-b"><SheetTitle>Resume Sections</SheetTitle></SheetHeader>
          <Sidebar activeSection={activeSection} onSectionChange={handleSection} />
        </SheetContent>
      </Sheet>

      <div className="fixed top-16 left-4 z-50">
        <Button variant={showPreview ? 'destructive' : 'secondary'} size="sm" onClick={togglePreview}>
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>

      <main className={`px-4 transition-all duration-300 ${showPreview ? 'mt-24' : 'mt-4'}`} ref={previewRef}>
        {showPreview && <ResumePreview />}
      </main>
    </div>
  );
}
