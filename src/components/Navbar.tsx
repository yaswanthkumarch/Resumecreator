'use client';

import React from 'react';
import { Moon, Sun, Download, RotateCcw, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useResume } from '@/contexts/ResumeContext';
import { useTemplate } from '@/contexts/TemplateContext';
import { toast } from '@/hooks/use-toast';
import { exportResumePDF } from './utils/exportResumePDF';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { dispatch, resumeData } = useResume();
  const { selectedTemplate } = useTemplate();

  const handleExportPDF = async () => {
    try {
      toast({ title: 'Generating PDF', description: 'Preparing your resume...' });

      // Wait 300ms to ensure the resume preview element is mounted
      await new Promise(resolve => setTimeout(resolve, 300));

      await exportResumePDF(selectedTemplate, resumeData);
      toast({ title: 'Download Successful', description: 'Your resume PDF is ready.' });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: 'Export Failed',
        description: 'Failed to generate PDF.',
        variant: 'destructive',
      });
    }
  };

  const handleReset = () => {
    if (confirm('Reset all resume data? This cannot be undone.')) {
      dispatch({ type: 'RESET_DATA' });
      toast({ title: 'Data Reset', description: 'All information cleared.' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex flex-col items-start space-y-1 cursor-default select-none">
  <div className="flex items-center space-x-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-indigo-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="3" y="4" width="14" height="16" rx="2" ry="2" />
      <line x1="7" y1="8" x2="13" y2="8" />
      <line x1="7" y1="12" x2="13" y2="12" />
      <polyline points="9 16 11 18 15 14" />
    </svg>
    <h1 className="text-xl sm:text-2xl font-bold text-indigo-700">
      Siva Resume Builder
    </h1>
  </div>
  <p className="text-sm text-indigo-500 ml-11">Smart Resumes for Smarter Careers.</p>
</div>


        <div className="flex items-center space-x-2">
          {/* Mobile buttons */}
          {/* <Button variant="ghost" size="icon" onClick={handleExportPDF} className="sm:hidden" title="Export PDF">
            <Download className="h-5 w-5 text-indigo-600" />
          </Button> */}
          <Button variant="ghost" size="icon" onClick={handleReset} className="sm:hidden" title="Reset Data">
            <RotateCcw className="h-5 w-5 text-red-600" />
          </Button>

          {/* Desktop buttons */}
          {/* <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
            className="hidden sm:flex hover:bg-indigo-50"
            title="Export Resume as PDF"
          >
            <Download className="h-5 w-5 mr-2 text-indigo-600" />
            Export PDF
          </Button> */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="hidden sm:flex hover:bg-red-50"
            title="Reset all resume data"
          >
            <RotateCcw className="h-5 w-5 mr-2 text-red-600" />
            Reset
          </Button>

          {/* Theme toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-indigo-100"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-indigo-600" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
