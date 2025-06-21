import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResume } from '@/contexts/ResumeContext';

export function PersonalInfoForm() {
  const { resumeData, dispatch } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="animate-fade-in shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="border-b border-gray-300">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName" className="font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={personalInfo.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john.doe@email.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="linkedin" className="font-medium text-gray-700">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={personalInfo.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="github" className="font-medium text-gray-700">
                GitHub
              </Label>
              <Input
                id="github"
                value={personalInfo.github}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="github.com/johndoe"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="portfolio" className="font-medium text-gray-700">
                Portfolio / Website
              </Label>
              <Input
                id="portfolio"
                value={personalInfo.portfolio}
                onChange={(e) => handleChange('portfolio', e.target.value)}
                placeholder="johndoe.com"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="font-medium text-gray-700">
              Address
            </Label>
            <Textarea
              id="address"
              value={personalInfo.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="City, State, Country"
              rows={2}
              className="mt-1 resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
