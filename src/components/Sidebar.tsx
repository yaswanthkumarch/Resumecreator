
import React from 'react';
import { User, GraduationCap, Briefcase, Star, FolderOpen, FileText, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Star },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'templates', label: 'Templates', icon: Palette },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border p-4 hidden lg:block">
      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-all duration-200",
                activeSection === section.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
