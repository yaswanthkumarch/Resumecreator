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
    (acc[skill.category] ||= []).push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="font-lora text-gray-900 bg-white p-10 max-w-4xl mx-auto shadow-lg ring-1 ring-gray-200">
      {/* Header */}
      <header className="text-center mb-10 pb-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="mt-2 text-gray-600">
          {personalInfo.email && personalInfo.email + ' • '}
          {personalInfo.phone && personalInfo.phone + ' • '}
          {personalInfo.linkedin && personalInfo.linkedin + ' • '}
          {personalInfo.address}
        </p>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-center text-blue-800 mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience & Education */}
      <div className="md:flex md:gap-8">
        {/* Experience */}
        {experience.length > 0 && (
          <section className="md:w-1/2 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 border-b-4 border-blue-200 mb-4">Experience</h2>
            <ul className="space-y-6">
              {experience.map((exp) => (
                <li key={exp.id}>
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <h3 className="text-lg font-bold">{exp.position}</h3>
                      <p className="text-blue-600">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exp.bulletPoints.map((pt, i) => pt.trim() && <li key={i}>{pt}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="md:w-1/2 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 border-b-4 border-blue-200 mb-4">Education</h2>
            <ul className="space-y-6">
              {education.map((edu) => (
                <li key={edu.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{edu.degree}{edu.field && `, ${edu.field}`}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </p>
                  </div>
                  {edu.gpa && <p className="text-gray-700 mt-1">GPA: {edu.gpa}</p>}
                  {edu.description && <p className="text-gray-700 mt-1 italic">{edu.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Skills & Projects */}
      <div className="md:flex md:gap-8">
        {/* Skills */}
        {skills.length > 0 && (
          <section className="md:w-1/2 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 border-b-4 border-blue-200 mb-4">Skills</h2>
            {Object.entries(skillsByCategory).map(([cat, skills]) => (
              <div key={cat} className="mb-4">
                <h3 className="font-semibold text-gray-800">{cat}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="md:w-1/2 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 border-b-4 border-blue-200 mb-4">Projects</h2>
            <ul className="space-y-6">
              {projects.map((p) => (
                <li key={p.id}>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-900">{p.title}</h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(p.startDate)} – {formatDate(p.endDate)}
                    </p>
                  </div>
                  <p className="text-gray-700">{p.description}</p>
                  {p.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap gap-4 text-sm">
                    {p.link && (
                      <a
                        href={p.link}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Demo
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
