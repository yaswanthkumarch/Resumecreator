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
    <div className="font-serif text-gray-900 bg-white max-w-4xl mx-auto p-12 rounded-lg shadow-xl ring-1 ring-gray-200">
      {/* Header */}
      <header className="text-center mb-12 border-b-4 border-blue-600 pb-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-blue-900">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="mt-3 text-lg text-gray-700 space-x-3 flex justify-center flex-wrap gap-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
        </p>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-700 border-l-4 border-blue-600 pl-4 mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
        </section>
      )}

      {/* Experience & Education */}
      <div className="md:flex md:space-x-12 mb-12">
        {/* Experience */}
        {experience.length > 0 && (
          <section className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-2xl font-semibold text-blue-700 border-b-4 border-blue-600 pb-2 mb-6">
              Experience
            </h2>
            <ul className="space-y-8">
              {experience.map((exp) => (
                <li key={exp.id} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition">
                        {exp.position}
                      </h3>
                      <p className="text-blue-600 italic">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-500 italic">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                    {exp.bulletPoints.map((pt, i) => pt.trim() && <li key={i}>{pt}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-blue-700 border-b-4 border-blue-600 pb-2 mb-6">
              Education
            </h2>
            <ul className="space-y-8">
              {education.map((edu) => (
                <li key={edu.id}>
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {edu.degree}
                        {edu.field && `, ${edu.field}`}
                      </h3>
                      <p className="text-gray-600 italic">{edu.school}</p>
                    </div>
                    <p className="text-sm text-gray-500 italic">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </p>
                  </div>
                  {edu.gpa && <p className="text-gray-700 mt-1 font-medium">GPA: {edu.gpa}</p>}
                  {edu.description && (
                    <p className="text-gray-600 mt-1 italic max-w-prose">{edu.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Skills & Projects */}
      <div className="md:flex md:space-x-12">
        {/* Skills */}
        {skills.length > 0 && (
          <section className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-2xl font-semibold text-blue-700 border-b-4 border-blue-600 pb-2 mb-6">
              Skills
            </h2>
            {Object.entries(skillsByCategory).map(([cat, skills]) => (
              <div key={cat} className="mb-6">
                <h3 className="font-semibold text-gray-800 text-lg mb-3">{cat}</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="px-4 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-medium shadow-sm"
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
          <section className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-blue-700 border-b-4 border-blue-600 pb-2 mb-6">
              Projects
            </h2>
            <ul className="space-y-8">
              {projects.map((p) => (
                <li key={p.id}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-900 text-xl">{p.title}</h3>
                    <p className="text-sm text-gray-500 italic">
                      {formatDate(p.startDate)} – {formatDate(p.endDate)}
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{p.description}</p>
                  {p.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {p.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap gap-6 text-sm font-medium">
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
