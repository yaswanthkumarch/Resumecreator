
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';

interface MobileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function MobileSidebar({ activeSection, onSectionChange }: MobileSidebarProps) {
  const [open, setOpen] = React.useState(false);

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="fixed top-20 left-4 z-40">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-4">
            <SheetTitle>Resume Sections</SheetTitle>
          </SheetHeader>
          <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
