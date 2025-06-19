import React from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Star,
  FolderOpen,
  FileText,
  Palette,
  Gauge
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string; // Allow passing custom classes for mobile/desktop
}

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Star },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'templates', label: 'Templates', icon: Palette },
  { id: 'score', label: 'Score', icon: Gauge }, // Capitalize for consistency
];

export function Sidebar({ activeSection, onSectionChange, className }: SidebarProps) {
  return (
    <div
      className={cn(
        'w-full max-w-xs bg-card border-r border-border p-4',
        className // Allow custom override (e.g., lg:block or overflow-y-auto for Sheet)
      )}
    >
      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
