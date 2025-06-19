import React from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import { Mail, Phone, Link, MapPin } from 'lucide-react';

interface TwoColumnTemplateProps {
  data: ResumeData;
}

export function TwoColumnTemplate({ data }: TwoColumnTemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="max-h-[85vh] max-w-full overflow-auto rounded-md">
      <div className="flex font-inter min-w-[850px] max-w-4xl bg-white text-gray-900 mx-auto shadow">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-slate-800 text-white p-6 space-y-8">
          {/* Contact Info */}
          <div>
            <h1 className="text-2xl font-bold mb-4">{personalInfo.fullName || 'Your Name'}</h1>
            <div className="space-y-3 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-300" />
                  <span className="text-slate-200">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-300" />
                  <span className="text-slate-200">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4 text-slate-300" />
                  <span className="text-slate-200">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-300" />
                  <span className="text-slate-200">{personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-100 mb-4">SKILLS</h2>
              <div className="space-y-4">
                {Object.entries(skillsByCategory).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-medium text-slate-200 mb-2 text-sm">{category}</h3>
                    <div className="space-y-2">
                      {items.map((skill) => (
                        <div key={skill.id} className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-300">{skill.name}</span>
                            <span className="text-slate-400 text-xs">{skill.level}/5</span>
                          </div>
                          <div className="bg-slate-700 h-2 rounded">
                            <div
                              className="bg-blue-400 h-2 rounded"
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-100 mb-4">EDUCATION</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-medium text-slate-200 text-sm">{edu.degree}</h3>
                    {edu.field && <p className="text-slate-300 text-sm">{edu.field}</p>}
                    <p className="text-slate-300 text-sm">{edu.school}</p>
                    <p className="text-slate-400 text-xs">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-slate-400 text-xs">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="w-2/3 p-8 space-y-8">
          {/* Summary */}
          {summary && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-blue-500 pb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-blue-500 pb-2">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.bulletPoints.map((point, idx) =>
                          point.trim() ? (
                            <li key={idx} className="leading-relaxed">
                              {point}
                            </li>
                          ) : null
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
              <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-blue-500 pb-2">
                KEY PROJECTS
              </h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      <div className="text-sm text-gray-500">
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4 text-sm">
                      {project.link && (
                        <a href={project.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
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
      </div>
    </div>
  );
}
