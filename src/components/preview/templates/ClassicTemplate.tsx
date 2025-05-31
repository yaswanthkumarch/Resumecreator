
import React from 'react';
import { ResumeData } from '@/contexts/ResumeContext';

interface ClassicTemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="p-8 font-lora max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide text-center">
            Professional Summary
          </h2>
          <p className="text-gray-800 leading-relaxed text-justify">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide text-center">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="text-center mb-3">
                  <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                  <p className="font-semibold text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-600 italic">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.bulletPoints.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-800">
                    {exp.bulletPoints.map((point, index) => 
                      point.trim() && (
                        <li key={index} className="leading-relaxed">{point}</li>
                      )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide text-center">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p className="font-semibold text-gray-700">{edu.school}</p>
                <p className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
                {edu.description && (
                  <p className="text-gray-800 mt-2 italic">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide text-center">
            Skills & Competencies
          </h2>
          <div className="space-y-3">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="text-center">
                <h3 className="font-semibold text-gray-800 mb-2">{category}:</h3>
                <p className="text-gray-700">
                  {categorySkills.map(skill => skill.name).join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide text-center">
            Notable Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="text-center">
                <h3 className="font-bold text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600 italic mb-2">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </p>
                <p className="text-gray-800 mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                  </p>
                )}
                <div className="flex justify-center gap-4 text-sm mt-2">
                  {project.link && (
                    <span className="text-gray-700">Demo: {project.link}</span>
                  )}
                  {project.github && (
                    <span className="text-gray-700">Code: {project.github}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
