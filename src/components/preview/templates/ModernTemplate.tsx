import React from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import { Mail, Phone, Link, MapPin, Github, Twitter, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-xl font-bold text-blue-700 uppercase mb-6 tracking-widest border-b-2 border-blue-300 pb-1">
      {title}
    </h2>
    {children}
  </section>
);

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString + '-01');
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects } = data;

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white text-gray-900 font-sans text-sm leading-relaxed shadow-lg rounded-md border border-gray-300">
      
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
          {/* <p className="text-gray-600 mt-2">{experience.position || 'Your Professional Title'}</p> */}
        </div>
        <div className="flex gap-5 mt-6 md:mt-0 text-gray-500">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} title="Email" className="hover:text-blue-600">
              <Mail className="w-6 h-6" />
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} title="Phone" className="hover:text-blue-600">
              <Phone className="w-6 h-6" />
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-blue-600">
              <Link className="w-6 h-6" />
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-blue-600">
              <Github className="w-6 h-6" />
            </a>
          )}
          {personalInfo.twitter && (
            <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" className="hover:text-blue-600">
              <Twitter className="w-6 h-6" />
            </a>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" title="Website" className="hover:text-blue-600">
              <Globe className="w-6 h-6" />
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <Section title="Professional Summary">
          <p className="text-gray-700 text-justify">{summary}</p>
        </Section>
      )}

      {/* Experience (Timeline) */}
      {experience.length > 0 && (
        <Section title="Experience">
          <div className="relative border-l-2 border-blue-400 pl-8 space-y-10">
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                <span className="absolute -left-5 top-1 bg-blue-600 rounded-full w-4 h-4 ring-4 ring-white"></span>
                <div className="flex justify-between flex-wrap md:flex-nowrap gap-4 md:gap-0">
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="italic text-blue-600">{exp.company}</p>
                    <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
                      {exp.bulletPoints
                        .filter(point => point.trim())
                        .map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="md:w-1/3 text-right text-gray-500 whitespace-nowrap text-sm font-medium">
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    {exp.current && (
                      <span className="ml-2 inline-block bg-green-200 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education (Timeline) */}
      {education.length > 0 && (
        <Section title="Education">
          <div className="relative border-l-2 border-blue-400 pl-8 space-y-10">
            {education.map((edu) => (
              <div key={edu.id} className="relative">
                <span className="absolute -left-5 top-1 bg-blue-600 rounded-full w-4 h-4 ring-4 ring-white"></span>
                <div className="flex justify-between flex-wrap md:flex-nowrap gap-4 md:gap-0">
                  <div className="md:w-2/3">
                    <h3 className="font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <p className="italic text-blue-600">{edu.school}</p>
                    {edu.gpa && <p className="text-xs text-gray-500 mt-1">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="md:w-1/3 text-right text-gray-500 whitespace-nowrap text-sm font-medium">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills & Competencies">
          <div className="space-y-6">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-base font-semibold text-gray-800 mb-3">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold shadow-sm hover:bg-blue-200 cursor-default transition"
                      title={skill.name}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects">
          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.id} className="space-y-3 border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(project.startDate)} – {formatDate(project.endDate)}
                  </span>
                </div>
                <p className="text-gray-700">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-6 text-sm mt-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
