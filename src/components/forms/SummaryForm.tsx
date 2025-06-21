import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { toast } from '@/hooks/use-toast';

export function SummaryForm() {
  const { resumeData, dispatch } = useResume();
  const { summary } = resumeData;
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSummaryChange = (value: string) => {
    dispatch({ type: 'UPDATE_SUMMARY', payload: value });
  };

  const generateAISummary = async () => {
    setIsGenerating(true);

    // Simulate AI generation with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI-generated summary based on user data
    const { personalInfo, experience, education } = resumeData;

    let aiSummary = "Dedicated professional with ";

    if (experience.length > 0) {
      const totalYears = experience.length * 2; // rough estimate
      aiSummary += `${totalYears}+ years of experience in ${experience[0]?.position || 'various roles'}. `;
    }

    if (education.length > 0) {
      aiSummary += `Graduate with ${education[0]?.degree || 'relevant degree'} from ${education[0]?.school || 'respected institution'}. `;
    }

    aiSummary += "Proven track record of delivering results and contributing to team success. Passionate about continuous learning and professional growth.";

    handleSummaryChange(aiSummary);
    setIsGenerating(false);

    toast({
      title: "AI Summary Generated",
      description: "Your professional summary has been created!",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="animate-fade-in shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="border-b border-gray-300">
          <CardTitle className="flex items-center justify-between text-xl font-semibold text-gray-900">
            Professional Summary
            <Button
              variant="outline"
              size="sm"
              onClick={generateAISummary}
              disabled={isGenerating}
              className="ml-3 flex items-center"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              {isGenerating ? 'Generating...' : 'AI Suggest'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label
              htmlFor="summary"
              className="block font-medium text-gray-700 mb-2"
            >
              Summary
            </Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
              rows={6}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-3">
              Tip: Keep it concise (2-3 sentences) and focus on your unique value proposition.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
