import React from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import { Mail, Phone, Link, MapPin, ExternalLink } from 'lucide-react';

interface MinimalistTemplateProps {
  data: ResumeData;
}

export function MinimalistTemplate({ data }: MinimalistTemplateProps) {
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
    <div className="max-w-4xl mx-auto p-12 bg-white text-gray-900 font-sans shadow-xl rounded-lg border border-gray-200">
      {/* Header */}
      <header className="mb-12 border-b border-indigo-400 pb-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-indigo-700 mb-3">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-8 text-gray-600 text-sm font-light">
          {personalInfo.email && (
            <div className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-pointer">
              <Mail className="w-5 h-5" />
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-pointer">
              <Link className="w-5 h-5" />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{personalInfo.address}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-12 max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 font-light leading-relaxed italic border-l-4 border-indigo-400 pl-4">
            {summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* Left Column: Experience + Projects */}
        <div className="space-y-14">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-3xl font-semibold text-indigo-700 border-b border-indigo-300 pb-2 mb-8 tracking-wide">
                Experience
              </h2>
              <div className="space-y-10">
                {experience.map((exp) => (
                  <article key={exp.id} className="group">
                    <header className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-indigo-600 font-semibold">{exp.company}</p>
                      </div>
                      <time className="text-sm text-gray-500 font-mono">
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </time>
                    </header>
                    {exp.bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 font-light space-y-1 pl-5">
                        {exp.bulletPoints.map(
                          (point, i) =>
                            point.trim() && (
                              <li key={i} className="leading-relaxed">
                                {point}
                              </li>
                            )
                        )}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-3xl font-semibold text-indigo-700 border-b border-indigo-300 pb-2 mb-8 tracking-wide">
                Projects
              </h2>
              <div className="space-y-10">
                {projects.map((project) => (
                  <article key={project.id}>
                    <header className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <time className="text-sm text-gray-500 font-mono">
                        {formatDate(project.startDate)} — {formatDate(project.endDate)}
                      </time>
                    </header>
                    <p className="text-gray-700 font-light mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-indigo-700 bg-indigo-100 rounded-full px-3 py-1 text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-6 text-indigo-600 font-medium text-sm">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                        >
                          Live Demo <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                        >
                          GitHub <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Education + Skills */}
        <div className="space-y-14">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-3xl font-semibold text-indigo-700 border-b border-indigo-300 pb-2 mb-8 tracking-wide">
                Education
              </h2>
              <div className="space-y-10">
                {education.map((edu) => (
                  <article key={edu.id}>
                    <header className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {edu.degree} {edu.field && <span className="italic font-light">in {edu.field}</span>}
                        </h3>
                        <p className="text-indigo-600 font-semibold">{edu.school}</p>
                        {edu.gpa && <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>}
                      </div>
                      <time className="text-sm text-gray-500 font-mono">
                        {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                      </time>
                    </header>
                    {edu.description && (
                      <p className="text-gray-700 font-light leading-relaxed">{edu.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-3xl font-semibold text-indigo-700 border-b border-indigo-300 pb-2 mb-8 tracking-wide">
                Skills
              </h2>
              <div className="space-y-8">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-4">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="bg-indigo-100 text-indigo-700 font-semibold rounded-full px-4 py-1 text-sm"
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
