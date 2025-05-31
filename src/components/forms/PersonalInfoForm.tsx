
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
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={personalInfo.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="John Doe"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
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
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="portfolio">Portfolio/Website</Label>
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
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={personalInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="City, State, Country"
            rows={2}
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
}
