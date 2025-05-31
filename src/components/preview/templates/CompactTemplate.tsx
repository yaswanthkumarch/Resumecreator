
import React from 'react';
import { ResumeData } from '@/contexts/ResumeContext';

interface CompactTemplateProps {
  data: ResumeData;
}

export function CompactTemplate({ data }: CompactTemplateProps) {
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
    <div className="p-6 font-inter max-w-4xl mx-auto bg-white text-gray-900 text-sm">
      {/* Compact Header */}
      <div className="text-center mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
          {personalInfo.address && <span>📍 {personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary - Compact */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 mb-2 bg-gray-100 px-2 py-1 inline-block">
            SUMMARY
          </h2>
          <p className="text-gray-700 leading-snug text-xs">{summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Experience - Compact */}
          {experience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-bold text-gray-900 mb-3 bg-gray-100 px-2 py-1 inline-block">
                EXPERIENCE
              </h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-xs text-gray-600">{exp.company}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside space-y-0 text-xs text-gray-700 ml-2">
                        {exp.bulletPoints.slice(0, 3).map((point, index) => 
                          point.trim() && (
                            <li key={index} className="leading-tight">{point}</li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects - Compact */}
          {projects.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-bold text-gray-900 mb-3 bg-gray-100 px-2 py-1 inline-block">
                PROJECTS
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{project.title}</h3>
                      <div className="text-xs text-gray-500">
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 mb-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-1">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="px-1 py-0.5 bg-gray-200 text-gray-600 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education - Compact */}
          {education.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-bold text-gray-900 mb-3 bg-gray-100 px-2 py-1 inline-block">
                EDUCATION
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                        <p className="text-xs text-gray-600">{edu.school}</p>
                        {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills - Compact */}
          {skills.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-bold text-gray-900 mb-3 bg-gray-100 px-2 py-1 inline-block">
                SKILLS
              </h2>
              <div className="space-y-2">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-xs font-medium text-gray-800 mb-1">{category}:</h3>
                    <div className="flex flex-wrap gap-1">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
