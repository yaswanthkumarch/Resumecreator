import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { ResumeData } from '@/contexts/ResumeContext';

interface ModernElegantTemplateProps {
  data: ResumeData;
}

export function MinimalistTemplate({ data }: ModernElegantTemplateProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { personalInfo, summary, education, experience, skills, projects } = data;

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textColor, setTextColor] = useState('#334155'); // slate-700
  const [headingColor, setHeadingColor] = useState('#4f46e5'); // indigo-700
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const formatDate = (d?: string) =>
    d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

  const skillsByCategory = skills.reduce((acc, skill) => {
    (acc[skill.category] ||= []).push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const handleDownloadClick = () => {
    setShowColorPicker(true);
  };

  const handleConfirmColors = () => {
    setShowColorPicker(false);
    if (!resumeRef.current) return;

    html2pdf()
      .set({
        margin: 10,
        filename: `${personalInfo.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, scrollY: -window.scrollY },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      })
      .from(resumeRef.current)
      .save();
  };

  const ColorPickerModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-2xl font-semibold mb-5 text-center">Choose Colors Before Download</h2>

        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="backgroundColor" className="font-medium">Background Color</label>
          <input
            type="color"
            id="backgroundColor"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-14 h-10 rounded cursor-pointer border border-gray-300"
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="textColor" className="font-medium">Text Color</label>
          <input
            type="color"
            id="textColor"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-14 h-10 rounded cursor-pointer border border-gray-300"
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <label htmlFor="headingColor" className="font-medium">Heading Color</label>
          <input
            type="color"
            id="headingColor"
            value={headingColor}
            onChange={(e) => setHeadingColor(e.target.value)}
            className="w-14 h-10 rounded cursor-pointer border border-gray-300"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowColorPicker(false)}
            className="px-5 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmColors}
            className="px-5 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen p-8 flex flex-col items-center font-sans bg-gray-50"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {showColorPicker && <ColorPickerModal />}

      <div
        ref={resumeRef}
        className="shadow-xl rounded-lg w-[800px] max-w-full p-10"
        style={{ backgroundColor, color: textColor }}
      >
        {/* Header */}
        <header className="border-b border-gray-300 pb-6 mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h1
              className="text-5xl font-extrabold tracking-wide leading-tight"
              style={{ color: headingColor }}
            >
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="mt-2 text-sm max-w-md" style={{ color: textColor }}>
              {personalInfo.email && <span>{personalInfo.email} &nbsp;&middot;&nbsp;</span>}
              {personalInfo.phone && <span>{personalInfo.phone} &nbsp;&middot;&nbsp;</span>}
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: textColor }}
                >
                  LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <>
                  &nbsp;&middot;&nbsp;
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: textColor }}
                  >
                    GitHub
                  </a>
                </>
              )}
            </p>
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-10">
            <h2 className="font-bold uppercase text-sm mb-3 tracking-widest" style={{ color: headingColor }}>
              Profile Summary
            </h2>
            <p className="text-base leading-relaxed max-w-3xl" style={{ color: textColor }}>
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        <section className="mb-10">
          <h2 className="font-bold uppercase text-sm mb-5 tracking-widest" style={{ color: headingColor }}>
            Experience
          </h2>
          {experience.map((e) => (
            <div key={e.id} className="mb-8 last:mb-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
                  {e.position}
                </h3>
                <span className="text-xs font-mono" style={{ color: textColor }}>
                  {formatDate(e.startDate)} – {e.current ? 'Present' : formatDate(e.endDate)}
                </span>
              </div>
              <p className="italic text-indigo-600 text-sm mb-3" style={{ color: headingColor }}>
                {e.company}
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1" style={{ color: textColor }}>
                {e.bulletPoints.slice(0, 3).map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-10">
          <h2 className="font-bold uppercase text-sm mb-5 tracking-widest" style={{ color: headingColor }}>
            Education
          </h2>
          {education.map((ed) => (
            <div key={ed.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
                  {ed.degree}
                  {ed.field && `, ${ed.field}`}
                </h3>
                <span className="text-xs font-mono" style={{ color: textColor }}>
                  {formatDate(ed.startDate)} – {formatDate(ed.endDate)}
                </span>
              </div>
              <p className="italic text-indigo-600 text-sm" style={{ color: headingColor }}>
                {ed.school}
              </p>
              {ed.gpa && (
                <p className="text-xs mt-1" style={{ color: textColor }}>
                  GPA: {ed.gpa}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="mb-10">
          <h2 className="font-bold uppercase text-sm mb-5 tracking-widest" style={{ color: headingColor }}>
            Projects
          </h2>
          {projects.map((p) => (
            <div key={p.id} className="mb-8 last:mb-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
                  {p.title}
                </h3>
                <span className="text-xs font-mono" style={{ color: textColor }}>
                  {formatDate(p.startDate)} – {formatDate(p.endDate)}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: textColor }}>
                {p.description}
              </p>
              {p.technologies.length > 0 && (
                <div className="flex flex-wrap mt-4 gap-3">
                  {p.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="tech-badge"
                      style={{ color: textColor, backgroundColor: '#e2e8f0' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {(p.link || p.github) && (
                <div className="mt-3 text-xs flex gap-5">
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                      style={{ color: textColor }}
                    >
                      Live Demo
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                      style={{ color: textColor }}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Skills */}
        <section>
          <h2 className="font-bold uppercase text-sm mb-5 tracking-widest" style={{ color: headingColor }}>
            Skills
          </h2>
          {Object.entries(skillsByCategory).map(([category, items]) => (
            <div key={category} className="mb-5">
              <h4 className="text-sm font-semibold mb-3" style={{ color: headingColor }}>
                {category}
              </h4>
              <div className="flex flex-wrap gap-4">
                {items.map((skill) => (
                  <span
                    key={skill.id}
                    className="skill-badge"
                    style={{
                      color: '#fff',
                      background: `linear-gradient(135deg, ${headingColor}, ${textColor})`,
                      boxShadow: `0 4px 8px ${headingColor}66`,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <button
        onClick={handleDownloadClick}
        className="mt-8 px-8 py-3 bg-indigo-700 hover:bg-indigo-800 text-white text-base font-semibold rounded-full shadow-lg transition-transform duration-200 ease-in-out"
      >
        Download as PDF
      </button>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

          ul {
            list-style-type: disc;
            margin-left: 1.25rem;
            padding-left: 0;
          }

          .skill-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 600;
            padding: 7px 16px;
            border-radius: 9999px;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            white-space: nowrap;
            user-select: none;
            cursor: default;
          }
          .skill-badge:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
          }

          .tech-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 600;
            padding: 6px 14px;
            border-radius: 9999px;
            box-shadow: inset 0 0 1px #cbd5e1, 0 2px 6px rgba(0, 0, 0, 0.08);
            transition: background 0.3s ease;
            user-select: none;
          }
          .tech-badge:hover {
            background: #cbd5e1;
          }

          a {
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
}
