import React from 'react';
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

interface MobileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function MobileSidebar({ activeSection, onSectionChange }: MobileSidebarProps) {
  const [open, setOpen] = React.useState(false);

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setOpen(false); // Close the drawer after selection
  };

  return (
    <div className="lg:hidden">
      {/* Mobile menu toggle button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="fixed top-4 left-4 z-50 bg-white shadow-md border"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>

        {/* Drawer content */}
        <SheetContent side="left" className="w-64 p-0 overflow-y-auto">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Resume Sections</SheetTitle>
          </SheetHeader>

          {/* Sidebar goes here */}
          <Sidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
