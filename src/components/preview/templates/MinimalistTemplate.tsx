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
    <div className="max-w-5xl mx-auto p-14 bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 text-gray-900 font-sans shadow-2xl rounded-xl border border-indigo-300 relative overflow-hidden">
      
      {/* Subtle abstract shape */}
      <svg
        className="absolute top-[-100px] right-[-100px] w-72 h-72 opacity-10"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="100" fill="url(#grad)" />
      </svg>

      {/* Header */}
      <header className="mb-16 border-b border-indigo-400 pb-6 text-center relative z-10">
        <h1 className="text-6xl font-serif font-extrabold tracking-tight text-indigo-700 mb-4 underline-animation">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-12 text-gray-600 text-sm font-light">
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-pointer"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
              {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-6 h-6" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-pointer underline-animation"
              aria-label="LinkedIn"
            >
              <Link className="w-6 h-6" />
              LinkedIn
            </a>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              {personalInfo.address}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-16 max-w-4xl mx-auto relative z-10">
          <p className="text-xl text-gray-700 font-light leading-relaxed italic border-l-8 border-indigo-400 pl-6 shadow-sm bg-indigo-50 rounded-lg py-4">
            {summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
        {/* Left Column: Experience + Projects */}
        <div className="space-y-20">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div className="relative border-l-2 border-indigo-300 ml-4 pl-8 space-y-12">
                {experience.map((exp) => (
                  <TimelineItem key={exp.id} title={exp.position} subtitle={exp.company} startDate={exp.startDate} endDate={exp.endDate} current={exp.current} >
                    {exp.bulletPoints.filter(pt => pt.trim()).map((point, i) => (
                      <li key={i} className="leading-relaxed text-gray-700 list-disc list-inside font-light">
                        {point}
                      </li>
                    ))}
                  </TimelineItem>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <SectionTitle>Projects</SectionTitle>
              <div className="relative border-l-2 border-indigo-300 ml-4 pl-8 space-y-12">
                {projects.map((project) => (
                  <TimelineItem key={project.id} title={project.title} startDate={project.startDate} endDate={project.endDate}>
                    <p className="text-gray-700 font-light mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-indigo-700 bg-indigo-100 rounded-full px-3 py-1 text-xs font-semibold transition-transform hover:scale-110"
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
                          className="inline-flex items-center gap-1 hover:underline hover:text-indigo-800 transition-colors"
                        >
                          Live Demo <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:underline hover:text-indigo-800 transition-colors"
                        >
                          GitHub <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </TimelineItem>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Education + Skills */}
        <div className="space-y-20">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="relative border-l-2 border-indigo-300 ml-4 pl-8 space-y-12">
                {education.map((edu) => (
                  <TimelineItem
                    key={edu.id}
                    title={`${edu.degree} ${edu.field ? `in ${edu.field}` : ''}`}
                    subtitle={edu.school}
                    startDate={edu.startDate}
                    endDate={edu.endDate}
                  >
                    {edu.gpa && <p className="text-sm text-gray-500 mt-1 font-mono">GPA: {edu.gpa}</p>}
                    {edu.description && (
                      <p className="text-gray-700 font-light leading-relaxed mt-2">{edu.description}</p>
                    )}
                  </TimelineItem>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <SectionTitle>Skills</SectionTitle>
              <div className="space-y-10">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-2xl font-serif font-semibold text-indigo-700 mb-6 border-l-4 border-indigo-400 pl-4 tracking-wide">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-5">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="bg-indigo-200 text-indigo-900 font-semibold rounded-full px-5 py-2 text-sm cursor-pointer transition-all shadow-md hover:shadow-indigo-400 hover:scale-105"
                          title={`Skill level: ${skill.level} / 5`}
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

      {/* Custom Styles */}
      <style jsx>{`
        .underline-animation {
          position: relative;
          display: inline-block;
        }
        .underline-animation::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: -6px;
          left: 0;
          background: linear-gradient(90deg, #4f46e5, #9333ea);
          border-radius: 2px;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .underline-animation:hover::after {
          transform: scaleX(1);
        }
      `}</style>
    </div>
  );
}

// Reusable components for timeline and section title
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl font-serif font-extrabold text-indigo-700 border-b-4 border-indigo-400 pb-3 mb-10 tracking-wide relative before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-indigo-400 before:rounded-sm before:opacity-80">
    {children}
  </h2>
);

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  children?: React.ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, subtitle, startDate, endDate, current, children }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <article className="relative pl-8 before:absolute before:left-[-22px] before:top-2 before:h-5 before:w-5 before:rounded-full before:bg-indigo-500 before:ring-4 before:ring-indigo-300">
      <header className="flex justify-between items-start mb-4 flex-wrap">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-indigo-600 font-semibold">{subtitle}</p>}
        </div>
        {(startDate || endDate) && (
          <time className="text-sm text-gray-500 font-mono whitespace-nowrap mt-1">
            {formatDate(startDate)} — {current ? 'Present' : formatDate(endDate)}
          </time>
        )}
      </header>
      {children}
    </article>
  );
};
