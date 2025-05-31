
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Plus, Trash2 } from 'lucide-react';
import { useResume, Skill } from '@/contexts/ResumeContext';

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Tools & Technologies',
  'Soft Skills',
  'Languages',
  'Other'
];

export function SkillsForm() {
  const { resumeData, dispatch } = useResume();
  const { skills } = resumeData;

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 3,
      category: 'Programming Languages'
    };
    dispatch({ type: 'ADD_SKILL', payload: newSkill });
  };

  const updateSkill = (id: string, field: string, value: any) => {
    dispatch({
      type: 'UPDATE_SKILL',
      payload: { id, data: { [field]: value } }
    });
  };

  const deleteSkill = (id: string) => {
    dispatch({ type: 'DELETE_SKILL', payload: id });
  };

  const getLevelText = (level: number) => {
    const levels = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
    return levels[level - 1] || 'Intermediate';
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Skills
          <Button onClick={addSkill} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No skills added yet. Click "Add Skill" to get started.
          </p>
        ) : (
          skills.map((skill) => (
            <div key={skill.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">Skill Entry</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSkill(skill.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`name-${skill.id}`}>Skill Name *</Label>
                  <Input
                    id={`name-${skill.id}`}
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    placeholder="JavaScript, React, Leadership..."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`category-${skill.id}`}>Category</Label>
                  <select
                    id={`category-${skill.id}`}
                    value={skill.category}
                    onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    {skillCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor={`level-${skill.id}`}>
                  Proficiency Level: {getLevelText(skill.level)} ({skill.level}/5)
                </Label>
                <div className="mt-2">
                  <Slider
                    id={`level-${skill.id}`}
                    min={1}
                    max={5}
                    step={1}
                    value={[skill.level]}
                    onValueChange={(value) => updateSkill(skill.id, 'level', value[0])}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
