'use client';

import React, { useState, useEffect } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { cn } from '@/lib/utils';
import { CheckCircle2, Lock } from 'lucide-react';
import { toast } from 'sonner';

const templates = [
  { id: 'classic', name: 'Classic', type: 'free' },
  { id: 'modern', name: 'Modern', type: 'free' },
  { id: 'minimalist', name: 'Minimalist', type: 'free' },
  { id: 'executive', name: 'Executive', type: 'premium' },
  { id: 'professional', name: 'Professional', type: 'premium' },
  { id: 'compact', name: 'Compact', type: 'free' },
  { id: 'two-column', name: 'Two Column', type: 'free' },
];

export function TemplateSelector() {
  const { resumeData, dispatch } = useResume();
  const { selectedTemplate } = resumeData;
  const [filter, setFilter] = useState<'free' | 'premium'>('free');

  // Set default selected template to 'classic' if none selected
  useEffect(() => {
    if (!selectedTemplate) {
      dispatch({ type: 'SET_TEMPLATE', payload: 'classic' });
    }
  }, [selectedTemplate, dispatch]);

  const filtered = templates.filter(t => t.type === filter);

  const handleSelect = (template: typeof templates[0]) => {
    dispatch({ type: 'SET_TEMPLATE', payload: template.id });
  };

  return (
    <section className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('free')}
          className={cn(
            'px-4 py-2 rounded text-sm font-medium',
            filter === 'free' ? 'bg-primary text-white' : 'bg-muted text-gray-700 hover:bg-muted/80'
          )}
        >
          Free Templates
        </button>
        <button
          onClick={() => setFilter('premium')}
          className={cn(
            'px-4 py-2 rounded text-sm font-medium',
            filter === 'premium' ? 'bg-primary text-white' : 'bg-muted text-gray-700 hover:bg-muted/80'
          )}
        >
          Premium Templates
        </button>
      </div>

      {/* List of Templates */}
      <div className="space-y-5">
        {filtered.map(template => (
          <div
            key={template.id}
            className={cn(
              'border p-5 rounded-lg shadow-sm relative flex items-center justify-between',
              selectedTemplate === template.id
                ? 'bg-primary/10 border-primary ring-1 ring-primary/40'
                : 'border-muted'
            )}
          >
            <span className="text-lg font-semibold">{template.name}</span>

            {template.type === 'premium' && (
              <Lock className="w-5 h-5 text-muted-foreground absolute right-5 top-5" />
            )}

            {selectedTemplate === template.id ? (
              <span className="text-primary flex items-center gap-1 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> Selected
              </span>
            ) : (
              <button
                onClick={() => handleSelect(template)}
                className="px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90"
              >
                Choose
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
