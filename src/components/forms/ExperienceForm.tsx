import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { useResume, Experience } from '@/contexts/ResumeContext';
import { toast } from '@/hooks/use-toast';

export function ExperienceForm() {
  const { resumeData, dispatch } = useResume();
  const { experience } = resumeData;
  const [improvingId, setImprovingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      bulletPoints: [''],
      description: ''
    };
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExperience });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { id, data: { [field]: value } }
    });
  };

  const deleteExperience = (id: string) => {
    dispatch({ type: 'DELETE_EXPERIENCE', payload: id });
  };

  const addBulletPoint = (experienceId: string) => {
    const exp = experience.find(e => e.id === experienceId);
    if (exp) {
      updateExperience(experienceId, 'bulletPoints', [...exp.bulletPoints, '']);
    }
  };

  const updateBulletPoint = (experienceId: string, index: number, value: string) => {
    const exp = experience.find(e => e.id === experienceId);
    if (exp) {
      const newBulletPoints = [...exp.bulletPoints];
      newBulletPoints[index] = value;
      updateExperience(experienceId, 'bulletPoints', newBulletPoints);
    }
  };

  const removeBulletPoint = (experienceId: string, index: number) => {
    const exp = experience.find(e => e.id === experienceId);
    if (exp && exp.bulletPoints.length > 1) {
      const newBulletPoints = exp.bulletPoints.filter((_, i) => i !== index);
      updateExperience(experienceId, 'bulletPoints', newBulletPoints);
    }
  };

  const improveBulletPoints = async (experienceId: string) => {
    setImprovingId(experienceId);

    // Simulate AI improvement delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const exp = experience.find(e => e.id === experienceId);
    if (exp) {
      const improvedBulletPoints = exp.bulletPoints.map(point => {
        if (point.trim()) {
          // Mock AI improvement - enhance professionalism
          return `• Enhanced ${point.toLowerCase()} resulting in improved team efficiency and measurable business impact.`;
        }
        return point;
      });

      updateExperience(experienceId, 'bulletPoints', improvedBulletPoints);
    }

    setImprovingId(null);
    toast({
      title: "Bullet Points Improved",
      description: "Your experience bullet points have been enhanced with AI!",
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="animate-fade-in shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="border-b border-gray-300">
          <CardTitle className="flex items-center justify-between text-xl font-semibold text-gray-900">
            Work Experience
            <Button onClick={addExperience} size="sm" className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {experience.length === 0 ? (
            <p className="text-muted-foreground text-center py-12 text-lg text-gray-600">
              No work experience entries yet. Click "Add Experience" to get started.
            </p>
          ) : (
            experience.map((exp) => (
              <div
                key={exp.id}
                className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg text-gray-800">Experience Entry</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteExperience(exp.id)}
                    className="text-red-600 hover:text-red-700"
                    aria-label="Delete experience entry"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor={`company-${exp.id}`} className="font-medium text-gray-700">
                      Company <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Tech Corp Inc."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`position-${exp.id}`} className="font-medium text-gray-700">
                      Position <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="Software Engineer"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`startDate-${exp.id}`} className="font-medium text-gray-700">
                      Start Date
                    </Label>
                    <Input
                      id={`startDate-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`endDate-${exp.id}`} className="font-medium text-gray-700">
                      End Date
                    </Label>
                    <Input
                      id={`endDate-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                      placeholder={exp.current ? 'Present' : ''}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-6">
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onCheckedChange={(checked) => {
                      updateExperience(exp.id, 'current', checked);
                      if (checked) {
                        updateExperience(exp.id, 'endDate', '');
                      }
                    }}
                  />
                  <Label htmlFor={`current-${exp.id}`} className="font-medium text-gray-700">
                    I currently work here
                  </Label>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="font-medium text-gray-700">
                      Key Achievements & Responsibilities
                    </Label>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => improveBulletPoints(exp.id)}
                        disabled={improvingId === exp.id}
                        className="flex items-center gap-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Sparkles className="h-4 w-4" />
                        {improvingId === exp.id ? 'Improving...' : 'AI Improve'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addBulletPoint(exp.id)}
                        className="flex items-center gap-1 border-green-600 text-green-600 hover:bg-green-50"
                      >
                        <Plus className="h-4 w-4" />
                        Add Point
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {exp.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Input
                          value={point}
                          onChange={(e) => updateBulletPoint(exp.id, index, e.target.value)}
                          placeholder="Describe your achievement or responsibility..."
                          className="flex-1"
                        />
                        {exp.bulletPoints.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBulletPoint(exp.id, index)}
                            className="text-red-600 hover:text-red-700"
                            aria-label="Remove bullet point"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
