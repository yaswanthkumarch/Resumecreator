'use client';
import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeScoreCardProps {
  score: number;
  missing: string[];
}

export function ResumeScoreCard({ score, missing }: ResumeScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(score / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  const getStatus = () => {
    if (score >= 85) return { label: 'Excellent', color: 'text-green-600', stroke: '#22c55e' };
    if (score >= 65) return { label: 'Good', color: 'text-yellow-600', stroke: '#eab308' };
    if (score >= 45) return { label: 'Fair', color: 'text-orange-500', stroke: '#fb923c' };
    return { label: 'Needs Work', color: 'text-red-500', stroke: '#ef4444' };
  };

  const { label, color, stroke } = getStatus();
  const r = 60;
  const c = 2 * Math.PI * r;
  const offset = c - (animatedScore / 100) * c;

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-xl max-w-md mx-auto text-center space-y-6 animate-fade-in transition-all duration-500">
      <h2 className="text-2xl font-bold text-gray-800">Resume Score</h2>
      <div className="relative w-[160px] h-[160px] mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={r} fill="none" stroke="#e5e7eb" strokeWidth="12" />
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth="12"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-gray-900">{animatedScore}</span>
          <span className="text-sm font-medium text-gray-500">/100</span>
        </div>
      </div>
      <p className={cn('text-lg font-semibold', color)}>{label}</p>

      {score < 65 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-md p-3 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span>
            Improve your resume by adding: <strong>{missing.join(', ') || 'more details'}</strong>
          </span>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-md p-3 flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Your resume is in great shape! 🎉</span>
        </div>
      )}
    </div>
  );
}
