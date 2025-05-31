
import React from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import { Mail, Phone, Link, MapPin } from 'lucide-react';

interface MinimalistTemplateProps {
  data: ResumeData;
}

export function MinimalistTemplate({ data }: MinimalistTemplateProps) {
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
    <div className="p-12 font-inter max-w-4xl mx-auto bg-white text-gray-900">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 font-light">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-12">
          <p className="text-gray-700 leading-relaxed text-lg font-light">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600 font-light">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500 font-light">
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.bulletPoints.length > 0 && (
                  <ul className="space-y-2 text-gray-700 font-light">
                    {exp.bulletPoints.map((point, index) => 
                      point.trim() && (
                        <li key={index} className="leading-relaxed pl-4 relative">
                          <span className="absolute left-0 top-2 w-1 h-1 bg-gray-400 rounded-full"></span>
                          {point}
                        </li>
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
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <p className="text-gray-600 font-light">{edu.school}</p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-sm text-gray-500 font-light">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 mt-2 font-light">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">
            Skills
          </h2>
          <div className="space-y-4">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="font-medium text-gray-800 mb-3">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-gray-700 font-light border-b border-gray-300 pb-1"
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

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">
            Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                  <div className="text-sm text-gray-500 font-light">
                    {formatDate(project.startDate)} — {formatDate(project.endDate)}
                  </div>
                </div>
                <p className="text-gray-700 mb-3 font-light">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-600 font-light border border-gray-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-6 text-sm font-light">
                  {project.link && (
                    <a href={project.link} className="text-gray-600 hover:text-gray-900 border-b border-gray-300">
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} className="text-gray-600 hover:text-gray-900 border-b border-gray-300">
                      GitHub
                    </a>
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
