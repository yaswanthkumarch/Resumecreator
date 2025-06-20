import React from 'react';
import { Moon, Sun, Download, RotateCcw, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useResume } from '@/contexts/ResumeContext';
import { toast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { dispatch, resumeData } = useResume();

  const handleExportPDF = async () => {
    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we create your resume PDF...",
      });

      const element = document.querySelector('.print-page');
      if (!element) throw new Error('Resume preview not found');

      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

      const fileName = resumeData.personalInfo.fullName
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      pdf.save(fileName);

      toast({
        title: "PDF Generated Successfully",
        description: "Your resume has been downloaded as a PDF file.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      dispatch({ type: 'RESET_DATA' });
      toast({
        title: "Data Reset",
        description: "All resume data has been cleared.",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-indigo-50 via-white to-indigo-50 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
       <div className="flex items-center space-x-4 cursor-default select-none">
  <FileText className="h-10 w-10 text-gradient bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 transition-transform duration-300 hover:scale-110" />
  <div className="flex flex-col space-y-1">
    <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-pink-700 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
      ResumeLoom
    </h1>
    {/* <p className="text-lg text-gray-700 max-w-lg font-medium">
      Weave your professional story with precision and power — create, analyze, and perfect your resume effortlessly.
    </p> */}
  </div>
</div>


        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
            className="hidden sm:flex hover:bg-indigo-50"
            title="Export Resume as PDF"
          >
            <Download className="h-5 w-5 mr-2 text-indigo-600" />
            Export PDF
          </Button>

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

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-indigo-100"
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
