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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="animate-fade-in shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="border-b border-gray-300">
          <CardTitle className="flex items-center justify-between text-xl font-semibold text-gray-900">
            Skills
            <Button onClick={addSkill} size="sm" className="flex items-center">
              <Plus className="h-4 w-4 mr-1" />
              Add Skill
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {skills.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No skills added yet. Click "Add Skill" to get started.
            </p>
          ) : (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="border rounded-lg p-6 space-y-5 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-800">Skill Entry</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSkill(skill.id)}
                    className="text-red-600 hover:text-red-700"
                    aria-label="Delete skill"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor={`name-${skill.id}`} className="font-medium text-gray-700">
                      Skill Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`name-${skill.id}`}
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      placeholder="JavaScript, React, Leadership..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`category-${skill.id}`}
                      className="font-medium text-gray-700"
                    >
                      Category
                    </Label>
                    <select
                      id={`category-${skill.id}`}
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <Label
                    htmlFor={`level-${skill.id}`}
                    className="font-medium text-gray-700"
                  >
                    Proficiency Level: <span className="font-semibold">{getLevelText(skill.level)}</span> ({skill.level}/5)
                  </Label>
                  <div className="mt-2">
                    <Slider
                      id={`level-${skill.id}`}
                      min={1}
                      max={5}
                      step={1}
                      value={[skill.level]}
                      onValueChange={(value) =>
                        updateSkill(skill.id, 'level', value[0])
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1 select-none">
                    <span>Beginner</span>
                    <span>Expert</span>
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
