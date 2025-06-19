import React, { useState, useEffect } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { WorkInProgressNotice } from './WorkInProgressNotice';

export function TemplateSelectorWithScore() {
  const { resumeData } = useResume();
  const [score, setScore] = useState<number>(0);
  const [showWIP, setShowWIP] = useState(true); // Show modal by default (you can toggle as needed)

  useEffect(() => {
    const result = calculateResumeScore(resumeData);
    setScore(result);
  }, [resumeData]);

  // If you want to only show WIP message regardless of score:
  return (
    <>
      {showWIP && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="relative">
            <WorkInProgressNotice />
            <button
              onClick={() => setShowWIP(false)}
              className="absolute top-2 right-2 text-sm px-3 py-1 rounded bg-primary text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {!showWIP && (
        <div className="flex items-center justify-center h-64">
          <WorkInProgressNotice />
        </div>
      )}
    </>
  );
}

// Score calculator (if needed)
function calculateResumeScore(resumeData: any): number {
  let score = 0;

  if (resumeData.contact?.name && resumeData.contact?.email) score += 10;
  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
    score += 25;
    if (resumeData.experience.length >= 3) score += 10;
  }
  if (Array.isArray(resumeData.education) && resumeData.education.length > 0) score += 20;
  if (Array.isArray(resumeData.skills) && resumeData.skills.length > 0) score += 20;

  if (resumeData.selectedTemplate === 'creative' && resumeData.roleType === 'corporate') {
    score -= 10;
  } else {
    score += 5;
  }

  return Math.max(0, Math.min(score, 100));
}
