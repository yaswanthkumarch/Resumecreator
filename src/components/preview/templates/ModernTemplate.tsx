import React, { useRef } from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import { Mail, Phone, Link, MapPin, Github, Twitter, Globe } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface ModernTemplateProps {
  data: ResumeData;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-base font-bold text-blue-700 uppercase mb-4 tracking-wide border-b-2 border-blue-300 pb-1">
      {title}
    </h2>
    {children}
  </section>
);

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString + '-01');
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects } = data;
  const resumeRef = useRef<HTMLDivElement>(null);

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const downloadPdf = () => {
    if (!resumeRef.current) return;

    const fileName = personalInfo.fullName
      ? `${personalInfo.fullName.trim().replace(/\s+/g, '_')}_Resume.pdf`
      : 'name_resume.pdf';

    html2pdf()
      .set({
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, scrollY: -window.scrollY },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      })
      .from(resumeRef.current)
      .save();
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12 font-sans text-gray-900"
      style={{ fontSize: '10px', lineHeight: 1.25 }}
    >
      {/* Resume Container */}
      <div
        ref={resumeRef}
        className="bg-white rounded-md shadow-lg border border-gray-300 flex max-w-5xl w-full"
        style={{ minHeight: '1056px', width: '842pt' /* A4 width in points */, overflow: 'hidden' }}
      >
        {/* Sidebar 32% */}
        <aside className="bg-blue-700 text-white p-6 w-[32%] flex flex-col">
          {/* Name */}
          <h1 className="text-4xl font-extrabold tracking-tight mb-3" style={{ lineHeight: 1 }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>

          {/* Contact */}
          <div className="flex flex-col gap-2 mt-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline break-words">
                  {personalInfo.email}
                </a>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${personalInfo.phone}`} className="hover:underline">
                  {personalInfo.phone}
                </a>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.address}</span>
              </div>
            )}

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="hover:text-blue-300 transition"
                >
                  <Link className="w-5 h-5" />
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="hover:text-blue-300 transition"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {personalInfo.twitter && (
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                  className="hover:text-blue-300 transition"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {personalInfo.website && (
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Website"
                  className="hover:text-blue-300 transition"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mt-auto">
              <h2 className="uppercase tracking-widest font-bold text-sm mt-8 mb-4 border-b border-blue-400 pb-1">
                Skills
              </h2>
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="mb-4">
                  <h3 className="font-semibold text-sm text-blue-300 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-1">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-blue-600 bg-opacity-80 px-2 py-0.5 rounded text-xs font-semibold shadow-md cursor-default select-none transition hover:bg-blue-500"
                        title={skill.name}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Content 68% */}
        <main className="p-8 w-[68%] overflow-hidden flex flex-col">
          {/* Summary */}
          {summary && (
            <section className="mb-8">
              <h2 className="text-sm uppercase font-bold text-gray-700 tracking-wide border-b border-gray-300 pb-1 mb-3">
                Professional Summary
              </h2>
              <p className="text-gray-800 text-justify leading-snug">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm uppercase font-bold text-gray-700 tracking-wide border-b border-gray-300 pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-base text-gray-900">{exp.position}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="italic text-blue-600 mb-2">{exp.company}</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      {exp.bulletPoints.slice(0, 3).map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm uppercase font-bold text-gray-700 tracking-wide border-b border-gray-300 pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-base text-gray-900">
                        {edu.degree}
                        {edu.field ? `, ${edu.field}` : ''}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="italic text-blue-600 mb-1">{edu.school}</p>
                    {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                    {edu.description && <p className="text-gray-700 italic text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm uppercase font-bold text-gray-700 tracking-wide border-b border-gray-300 pb-1 mb-3">
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 border border-gray-300 rounded shadow-sm hover:shadow-md transition cursor-default"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-base text-gray-900">{project.title}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(project.startDate)} – {formatDate(project.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-200 text-gray-700 rounded px-2 py-0.5 text-xs font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-6 text-sm mt-3">
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
            </section>
          )}
        </main>
      </div>

      {/* Download Button below */}
      <button
        onClick={downloadPdf}
        className="mt-8 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded shadow-md transition"
        aria-label="Download Resume PDF"
      >
        Download Resume PDF
      </button>
    </div>
  );
}
