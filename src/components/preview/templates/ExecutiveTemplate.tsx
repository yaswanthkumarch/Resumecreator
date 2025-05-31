
import React from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import { Mail, Phone, Link, MapPin } from 'lucide-react';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
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
    <div className="p-8 font-serif max-w-4xl mx-auto bg-white">
      {/* Header with Gold Accent */}
      <div className="border-b-4 border-amber-600 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-600" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4 text-amber-600" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              {personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center border-b-2 border-amber-600 pb-2 inline-block w-full">
            EXECUTIVE SUMMARY
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-amber-600">
            <p className="text-gray-800 leading-relaxed text-justify font-medium">{summary}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Professional Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-amber-600 pb-2">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-amber-600 pl-6 bg-gray-50 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-lg text-amber-700 font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-600 font-medium bg-white px-3 py-1 rounded">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.bulletPoints.length > 0 && (
                      <ul className="space-y-2 text-gray-800">
                        {exp.bulletPoints.map((point, index) => 
                          point.trim() && (
                            <li key={index} className="flex items-start">
                              <span className="text-amber-600 font-bold mr-3 mt-1">•</span>
                              <span className="leading-relaxed">{point}</span>
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

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-amber-600 pb-2">
                KEY PROJECTS
              </h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                      <span className="text-sm text-gray-600 font-medium">
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-800 mb-3 leading-relaxed">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4 text-sm">
                      {project.link && (
                        <a href={project.link} className="text-amber-700 hover:text-amber-900 font-semibold">
                          → Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} className="text-amber-700 hover:text-amber-900 font-semibold">
                          → Source Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Education */}
          {education.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-amber-600 pb-2">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-gray-700 font-medium">{edu.field}</p>}
                    <p className="text-amber-700 font-semibold">{edu.school}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-sm text-gray-600 font-medium">GPA: {edu.gpa}</p>}
                    {edu.description && (
                      <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Competencies */}
          {skills.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-amber-600 pb-2">
                CORE COMPETENCIES
              </h2>
              <div className="space-y-4">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">{skill.name}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-3 h-3 rounded-full mr-1 ${
                                  level <= skill.level ? 'bg-amber-600' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
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
