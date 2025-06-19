import React from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  SparklesIcon,
  UserIcon,
  EnvelopeIcon, // mail replaced by EnvelopeIcon
  PhoneIcon,
  LinkIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

interface CompactTemplateProps {
  data: ResumeData;
}

export function CompactTemplate({ data }: CompactTemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects } = data;

  const formatDate = (dateString?: string) => {
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
    <div className="max-h-[85vh] overflow-auto p-8 font-sans bg-white text-gray-900 text-sm min-w-[820px] mx-auto shadow-lg rounded-lg border border-gray-200">
      {/* Header */}
      <header className="text-center mb-8 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-6 mt-3 text-xs text-gray-600 font-medium">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <EnvelopeIcon className="w-4 h-4" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <PhoneIcon className="w-4 h-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.address && (
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              {personalInfo.address}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8 px-4">
          <h2 className="section-title text-sm font-semibold text-indigo-600 mb-1 tracking-wide">SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed text-xs">{summary}</p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="section-title text-sm font-semibold text-indigo-600 mb-4 tracking-wide">EXPERIENCE</h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                        <p className="text-xs text-gray-600 italic">{exp.company}</p>
                      </div>
                      <time className="text-xs text-gray-500 font-mono">
                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </time>
                    </div>
                    <ul className="list-disc list-inside text-xs text-gray-700 ml-3 space-y-0.5">
                      {exp.bulletPoints.slice(0, 3).map((point, i) =>
                        point.trim() ? <li key={i} className="leading-snug">{point}</li> : null
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="section-title text-sm font-semibold text-indigo-600 mb-4 tracking-wide">PROJECTS</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-sm text-gray-900">{project.title}</h3>
                      <time className="text-xs text-gray-500 font-mono">
                        {formatDate(project.startDate)} – {formatDate(project.endDate)}
                      </time>
                    </div>
                    <p className="text-xs text-gray-700 mb-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="bg-indigo-100 text-indigo-700 text-xs rounded-full px-2 py-0.5 font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="section-title text-sm font-semibold text-indigo-600 mb-4 tracking-wide">EDUCATION</h2>
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">
                        {edu.degree}
                        {edu.field && <span className="italic text-gray-600"> in {edu.field}</span>}
                      </h3>
                      <p className="text-xs text-gray-600 italic">{edu.school}</p>
                      {edu.gpa && <p className="text-xs text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
                    </div>
                    <time className="text-xs text-gray-500 font-mono">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </time>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="section-title text-sm font-semibold text-indigo-600 mb-4 tracking-wide">SKILLS</h2>
              <div className="space-y-4">
                {Object.entries(skillsByCategory).map(([category, skillList]) => (
                  <div key={category}>
                    <h3 className="text-xs font-semibold text-gray-800 mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span
                          key={skill.id}
                          className="bg-indigo-200 text-indigo-900 text-xs rounded-full px-3 py-1 font-semibold"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
