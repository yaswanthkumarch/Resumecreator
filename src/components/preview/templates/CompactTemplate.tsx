import React, { useState } from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import {
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CompactTemplateProps {
  data: ResumeData;
}

export function CompactTemplate({ data }: CompactTemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects } = data;
  const [loadingPDF, setLoadingPDF] = useState(false);

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

  const handleDownloadPDF = async () => {
    const element = document.getElementById('compact-template-root');
    if (!element || element.offsetHeight === 0) {
      alert('Resume preview is not visible.');
      return;
    }

    try {
      setLoadingPDF(true);

      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.maxHeight = 'none';
      clone.style.overflow = 'visible';
      clone.style.width = `${element.offsetWidth}px`;

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY,
        width: clone.offsetWidth,
        height: clone.scrollHeight,
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${personalInfo.fullName || 'resume'}.pdf`);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF.');
    } finally {
      setLoadingPDF(false);
    }
  };

  return (
   <div

>
   <div
        id="compact-template-root"
        className="max-h-[85vh] overflow-auto p-10 bg-white text-gray-900 text-base min-w-[820px] shadow-xl rounded-2xl border border-gray-300"
        style={{ boxShadow: '0 20px 45px rgba(99, 102, 241, 0.15)' }}
      >
        {/* Header */}
        <header className="text-center mb-10 border-b border-indigo-300 pb-6">
          <h1 className="text-5xl font-extrabold tracking-wide text-indigo-700 drop-shadow-md select-none">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-10 mt-5 text-sm text-indigo-600 font-medium tracking-wide">
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 hover:text-indigo-900 transition-colors duration-300"
                title="Email"
              >
                <EnvelopeIcon className="w-6 h-6" />
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-3" title="Phone">
                <PhoneIcon className="w-6 h-6" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-indigo-900 transition-colors duration-300"
                title="LinkedIn"
              >
                <LinkIcon className="w-6 h-6" />
                LinkedIn
              </a>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-3" title="Address">
                <MapPinIcon className="w-6 h-6" />
                {personalInfo.address}
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-14 px-4 max-w-4xl mx-auto">
            <h2 className="text-indigo-600 font-semibold tracking-wider mb-3 border-l-4 border-indigo-500 pl-4 text-sm uppercase select-none">
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg max-w-prose">{summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-16">
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-indigo-600 font-semibold tracking-wide mb-8 border-b border-indigo-300 pb-3 text-sm uppercase select-none">
                  Experience
                </h2>
                <div className="space-y-12">
                  {experience.map((exp) => (
                    <div key={exp.id} className="group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-xl text-gray-900 group-hover:text-indigo-700 transition-colors duration-300 select-text">
                            {exp.position}
                          </h3>
                          <p className="text-sm text-indigo-500 italic select-text">{exp.company}</p>
                        </div>
                        <time className="text-xs text-gray-500 font-mono select-text">
                          {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </time>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 text-base space-y-1 ml-5 select-text">
                        {exp.bulletPoints.slice(0, 3).map((point, i) =>
                          point.trim() ? <li key={i}>{point}</li> : null
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
                <h2 className="text-indigo-600 font-semibold tracking-wide mb-8 border-b border-indigo-300 pb-3 text-sm uppercase select-none">
                  Projects
                </h2>
                <div className="space-y-8">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-xl text-gray-900 select-text">{project.title}</h3>
                        <time className="text-xs text-gray-500 font-mono select-text">
                          {formatDate(project.startDate)} – {formatDate(project.endDate)}
                        </time>
                      </div>
                      <p className="text-gray-700 text-base mb-3 max-w-prose select-text">{project.description}</p>
                      <div className="flex flex-wrap gap-4">
                        {project.technologies.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className="bg-indigo-100 text-indigo-900 text-sm rounded-full px-4 py-1 font-semibold shadow-md select-none"
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
          <div className="space-y-16">
            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-indigo-600 font-semibold tracking-wide mb-8 border-b border-indigo-300 pb-3 text-sm uppercase select-none">
                  Education
                </h2>
                <div className="space-y-8">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-xl text-gray-900 select-text">
                          {edu.degree}
                          {edu.field && <span className="italic text-indigo-500"> in {edu.field}</span>}
                        </h3>
                        <p className="text-sm text-indigo-500 italic select-text">{edu.school}</p>
                        {edu.gpa && <p className="text-xs text-gray-400 mt-1 select-text">GPA: {edu.gpa}</p>}
                      </div>
                      <time className="text-xs text-gray-500 font-mono select-text">
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
                <h2 className="text-indigo-600 font-semibold tracking-wide mb-8 border-b border-indigo-300 pb-3 text-sm uppercase select-none">
                  Skills
                </h2>
                <div className="space-y-8">
                  {Object.entries(skillsByCategory).map(([category, skillList]) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-indigo-700 mb-4 uppercase tracking-wider select-none">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-5">
                        {skillList.map((skill) => (
                          <span
                            key={skill.id}
                            className="bg-indigo-300 text-indigo-900 text-sm rounded-full px-5 py-1.5 font-semibold shadow-md select-none"
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

      {/* Download PDF Button */}
      <div className="text-center mt-14">
        <button
          onClick={handleDownloadPDF}
          disabled={loadingPDF}
          className={`inline-block bg-indigo-600 text-white px-12 py-4 rounded-full font-semibold text-lg tracking-wide shadow-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 ${
            loadingPDF ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          type="button"
          aria-busy={loadingPDF}
          aria-label="Download resume as PDF"
        >
          {loadingPDF ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}
