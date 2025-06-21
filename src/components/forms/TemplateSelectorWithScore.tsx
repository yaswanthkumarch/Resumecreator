'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { ResumeScoreCard } from './ResumeScoreCard';
import { Loader2, WifiOff, ServerCrash, RefreshCcw } from 'lucide-react';

type ScoreData = {
  score: number;
  missing: string[];
  feedback?: string;
  rawResponse?: any; // to store raw GPT response if needed
};

export function TemplateSelectorWithScore() {
  const { resumeData } = useResume();
  const [scoreData, setScoreData] = useState<ScoreData>({
    score: 0,
    missing: [],
    feedback: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<'network' | 'server' | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const fetchScore = useCallback(async () => {
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

      setScoreData({
        score: data.score,
        missing: data.missing ?? [],
        feedback: data.feedback ?? '',
        rawResponse: data, // store entire response for debugging if needed
      });

      setError(null);

      // Stop polling if successful
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
        pollingRef.current = null;
      }
    } catch (e: any) {
      console.error('Score fetch error:', e);

      if (e.message === 'Failed to fetch' || e.name === 'TypeError') {
        setError('network');
      } else {
        setError('server');
      }
      setScoreData({ score: 0, missing: [], feedback: '' });

      // Poll again in 10 seconds if failed
      pollingRef.current = setTimeout(fetchScore, 10000);
    } finally {
      setLoading(false);
    }
  }, [resumeData]);

  useEffect(() => {
    fetchScore();

    return () => {
      if (pollingRef.current) clearTimeout(pollingRef.current);
    };
  }, [fetchScore]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border max-w-xl mx-auto mt-6 text-center min-h-[300px] flex flex-col justify-center items-center space-y-6">
      {loading ? (
        <div className="w-full animate-pulse space-y-4">
          {/* Loading skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/5 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          <div className="h-48 bg-gray-200 rounded mx-auto"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center animate-fade-in">
          {error === 'network' ? (
            <>
              <WifiOff className="w-10 h-10 mb-3 text-red-600" aria-label="No internet connection icon" />
              <p className="text-lg font-semibold text-red-600">No Internet Connection</p>
              <p className="text-sm text-gray-500 max-w-xs mb-4">
                Please check your connection and try again.
              </p>
            </>
          ) : (
            <>
              <ServerCrash className="w-10 h-10 mb-3 text-yellow-600" aria-label="Server busy icon" />
              <p className="text-lg font-semibold text-yellow-600">Our Servers Are Busy</p>
              <p className="text-sm text-gray-500 max-w-xs mb-4">
                Please try again in a few moments.
              </p>
            </>
          )}
          <button
            onClick={fetchScore}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/70"
            aria-label="Retry fetching resume score"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Retry
          </button>
        </div>
      ) : (
        <>
          <ResumeScoreCard
            score={scoreData.score}
            missing={scoreData.missing}
            feedback={scoreData.feedback || ''}
          />

          {/* Show only the feedback text below the score */}
          {scoreData.feedback && (
            <p className="mt-4 text-sm italic text-gray-700 max-w-lg">
              <strong>Feedback:</strong> {scoreData.feedback}
            </p>
          )}
        </>
      )}
    </div>
  );
}
