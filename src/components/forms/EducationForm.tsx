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
    <div className="overflow-x-auto w-full">
      <Card className="animate-fade-in min-w-[900px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Education
            <Button onClick={addEducation} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 min-w-[880px]">
          {education.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No education entries yet. Click "Add Education" to get started.
            </p>
          ) : (
            education.map((edu) => (
              <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Education Entry</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteEducation(edu.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`school-${edu.id}`}>School/University *</Label>
                    <Input
                      id={`school-${edu.id}`}
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      placeholder="University of Example"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`degree-${edu.id}`}>Degree *</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                    <Input
                      id={`field-${edu.id}`}
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Computer Science"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                    <Input
                      id={`gpa-${edu.id}`}
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="3.8/4.0"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${edu.id}`}
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${edu.id}`}
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`description-${edu.id}`}>Description (Optional)</Label>
                  <Textarea
                    id={`description-${edu.id}`}
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    placeholder="Relevant coursework, achievements, activities..."
                    rows={3}
                    className="mt-1"
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
