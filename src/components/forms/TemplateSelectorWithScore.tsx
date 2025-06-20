'use client';
import React, { useEffect, useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { ResumeScoreCard } from './ResumeScoreCard';
import { Loader2, WifiOff, ServerCrash } from 'lucide-react';

type ScoreData = {
  score: number;
  missing: string[];
  feedback?: string;
};

export function TemplateSelectorWithScore() {
  const { resumeData } = useResume();
  const [scoreData, setScoreData] = useState<ScoreData>({ score: 0, missing: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<'network' | 'server' | null>(null);

  useEffect(() => {
    const getScore = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('http://localhost:8000/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resume: resumeData }),
        });

        if (!res.ok) {
          throw new Error('Server error');
        }

        const data = await res.json();
        setScoreData({ score: data.score, missing: data.missing || [], feedback: data.feedback });
      } catch (e: any) {
        console.error('Score fetch error:', e);

        if (e.message === 'Failed to fetch' || e.name === 'TypeError') {
          setError('network');
        } else {
          setError('server');
        }
        setScoreData({ score: 0, missing: [], feedback: '' });
      } finally {
        setLoading(false);
      }
    };

    getScore();
  }, [resumeData]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border max-w-xl mx-auto mt-6 text-center min-h-[300px] flex flex-col justify-center items-center space-y-4">
      {loading ? (
        <div className="flex flex-col items-center animate-fade-in text-gray-600">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-2" />
          <p className="text-sm">Analyzing your resume, please wait...</p>
        </div>
      ) : error === 'network' ? (
        <div className="flex flex-col items-center text-red-500 animate-fade-in">
          <WifiOff className="w-10 h-10 mb-2" />
          <p className="text-lg font-semibold">No Internet Connection</p>
          <p className="text-sm text-gray-500">Please check your connection and try again.</p>
        </div>
      ) : error === 'server' ? (
        <div className="flex flex-col items-center text-yellow-500 animate-fade-in">
          <ServerCrash className="w-10 h-10 mb-2" />
          <p className="text-lg font-semibold">Our Servers Are Busy</p>
          <p className="text-sm text-gray-500">Please try again in a few moments.</p>
        </div>
      ) : (
        <ResumeScoreCard
          score={scoreData.score}
          missing={scoreData.missing}
          feedback={scoreData.feedback || ''}
        />
      )}
    </div>
  );
}
