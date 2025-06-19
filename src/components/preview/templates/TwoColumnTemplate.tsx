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
    <div className="max-h-[85vh] max-w-full overflow-auto rounded-lg shadow-xl border border-gray-200">
      <div className="flex min-w-[900px] max-w-4xl bg-white text-gray-900 mx-auto rounded-lg overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-1/3 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white p-8 space-y-10 flex flex-col justify-between shadow-lg">
          <div>
            {/* Name */}
            <h1 className="text-3xl font-extrabold tracking-wide mb-6 drop-shadow-lg">{personalInfo.fullName || 'Your Name'}</h1>

            {/* Contact Info */}
            <div className="space-y-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-3 hover:text-blue-300 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5 text-blue-300" />
                  <span className="break-words">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3 hover:text-blue-300 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 text-blue-300" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-3 hover:text-blue-300 transition-colors cursor-pointer">
                  <Link className="w-5 h-5 text-blue-300" />
                  <a
                    href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-200 break-words"
                  >
                    {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-300" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <section className="mt-10">
                <h2 className="text-lg font-semibold text-blue-300 tracking-wide mb-5 border-b border-blue-400 pb-1">
                  SKILLS
                </h2>
                <div className="space-y-5">
                  {Object.entries(skillsByCategory).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-blue-200 mb-3 text-sm tracking-wide">{category.toUpperCase()}</h3>
                      <div className="space-y-3">
                        {items.map((skill) => (
                          <div key={skill.id} className="text-sm">
                            <div className="flex justify-between mb-1">
                              <span>{skill.name}</span>
                              <span className="text-blue-400 text-xs font-mono">{skill.level}/5</span>
                            </div>
                            <div className="bg-blue-700 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-width duration-500"
                                style={{ width: `${(skill.level / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Education */}
          {education.length > 0 && (
            <section className="mt-auto">
              <h2 className="text-lg font-semibold text-blue-300 mb-5 border-t border-blue-400 pt-4 tracking-wide">
                EDUCATION
              </h2>
              <div className="space-y-5 text-sm text-blue-200">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold">{edu.degree}</h3>
                    {edu.field && <p>{edu.field}</p>}
                    <p>{edu.school}</p>
                    <p className="text-blue-400 text-xs">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-blue-400 text-xs">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Main Content */}
        <main className="w-2/3 p-10 space-y-12">
          {/* Summary */}
          {summary && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-4 border-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 inline-block pb-1 tracking-wide">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-4 border-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 inline-block pb-1 tracking-wide">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <article key={exp.id} className="group relative">
                    <header className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-500 transition-colors">
                          {exp.position}
                        </h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <time className="text-sm text-gray-500 italic">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </time>
                    </header>
                    {exp.bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1 text-md leading-relaxed">
                        {exp.bulletPoints.map((point, idx) =>
                          point.trim() ? <li key={idx}>{point}</li> : null
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-4 border-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 inline-block pb-1 tracking-wide">
                KEY PROJECTS
              </h2>
              <div className="space-y-8">
                {projects.map((project) => (
                  <article key={project.id} className="group">
                    <header className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-500 transition-colors">
                        {project.title}
                      </h3>
                      <time className="text-sm text-gray-500 italic">
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </time>
                    </header>
                    <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-3">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-cyan-300 to-blue-300 text-blue-900 rounded-full text-sm font-semibold shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-6 text-sm">
                      {project.link && (
                        <a
                          href={project.link}
                          className="text-blue-600 hover:underline font-semibold"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          className="text-blue-600 hover:underline font-semibold"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
