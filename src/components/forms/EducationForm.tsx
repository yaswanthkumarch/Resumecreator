import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useResume, Education } from '@/contexts/ResumeContext';

export function EducationForm() {
  const { resumeData, dispatch } = useResume();
  const { education } = resumeData;

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: ''
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEducation });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { id, data: { [field]: value } }
    });
  };

  const deleteEducation = (id: string) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id });
  };

  return (
    <div className="w-full">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Education
            <Button onClick={addEducation} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {education.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No education entries yet. Click "Add Education" to get started.
            </p>
          ) : (
            education.map((edu) => (
              <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">Education Entry</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteEducation(edu.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>School / University *</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      placeholder="University of Example"
                    />
                  </div>

                  <div>
                    <Label>Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>

                  <div>
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>

                  <div>
                    <Label>GPA (Optional)</Label>
                    <Input
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="3.8 / 4.0"
                    />
                  </div>

                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Description (Optional)</Label>
                  <Textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    placeholder="Relevant coursework, achievements, activities..."
                    rows={3}
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
