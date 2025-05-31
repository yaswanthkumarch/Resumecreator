
import React from 'react';
import { Moon, Sun, Download, RotateCcw, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useResume } from '@/contexts/ResumeContext';
import { toast } from '@/hooks/use-toast';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { dispatch } = useResume();

  const handleExportPDF = () => {
    // For now, show a toast. We'll implement PDF export later
    toast({
      title: "Export Feature",
      description: "PDF export functionality will be implemented next!",
    });
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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            AI Resume Builder
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
            className="hidden sm:flex"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="hidden sm:flex"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
