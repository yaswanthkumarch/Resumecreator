import React, { useRef } from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import html2pdf from 'html2pdf.js';

interface ClassicTemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects } = data;
  const resumeRef = useRef<HTMLDivElement>(null);

  const formatDate = (d?: string) =>
    d ? new Date(d + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

  const skillsByCategory = skills.reduce((a, s) => {
    (a[s.category] ||= []).push(s);
    return a;
  }, {} as Record<string, typeof skills>);

  const downloadPdf = () => {
    if (!resumeRef.current) return;

    html2pdf()
      .set({
        margin: 0,
        filename: `${personalInfo.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, scrollY: -window.scrollY },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      })
      .from(resumeRef.current)
      .toPdf()
      .get('pdf')
      .then((pdf: any) => {
        pdf.save();
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8 flex flex-col items-center">
      <style>
        {`
          .resume-container {
            width: 595pt; /* A4 width */
            font-family: 'Inter', sans-serif;
            font-size: 10px;
            line-height: 1.15;
            color: #1e293b; /* cool dark slate */
            background: white;
            padding: 24pt 28pt;
            box-sizing: border-box;
            border-radius: 16pt;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
            display: flex;
            gap: 20pt;
            max-width: 100%;
          }

          .sidebar {
            width: 32%;
            display: flex;
            flex-direction: column;
            gap: 20pt;
            padding-right: 16pt;
            border-right: 2px solid #cbd5e1;
          }

          .content {
            width: 68%;
            display: flex;
            flex-direction: column;
            gap: 28pt;
          }

          /* Headings */
          h1 {
            font-size: 26px;
            font-weight: 900;
            color: #4338ca;
            letter-spacing: 0.1em;
            margin-bottom: 6px;
            user-select: none;
          }

          h2.section-title {
            font-weight: 800;
            font-size: 14px;
            color: #3730a3;
            text-transform: uppercase;
            border-left: 5px solid #6366f1;
            padding-left: 10px;
            margin-bottom: 12px;
            letter-spacing: 0.12em;
          }

          h3 {
            font-size: 12px;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 4px 0;
          }

          p, span, li {
            font-size: 10px;
            line-height: 1.15;
            color: #334155;
          }

          /* Contact info */
          .contact-info span {
            display: block;
            margin-bottom: 5px;
            color: #64748b;
            font-weight: 600;
          }

          /* Lists */
          ul {
            margin: 0;
            padding-left: 18px;
            list-style-type: disc;
          }

          ul li {
            margin-bottom: 7px;
          }

          /* Skill badges */
          .skill-badge {
            display: inline-block;
            background: #e0e7ff;
            color: #4338ca;
            font-weight: 700;
            font-size: 9px;
            padding: 5px 12px;
            border-radius: 9999px;
            margin: 4px 6px 4px 0;
            box-shadow: 0 2px 6px rgb(99 102 241 / 0.3);
            user-select: none;
            cursor: default;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          .skill-badge:hover {
            background-color: #c7d2fe;
            transform: scale(1.05);
          }

          /* Tech badges */
          .tech-badge {
            display: inline-block;
            background: #f1f5f9;
            color: #475569;
            font-weight: 600;
            font-size: 8.5px;
            padding: 4px 9px;
            border-radius: 9999px;
            margin: 3px 5px 3px 0;
            user-select: none;
            cursor: default;
            transition: background-color 0.25s ease;
          }
          .tech-badge:hover {
            background-color: #e2e8f0;
          }

          /* Links */
          a {
            color: #4338ca;
            font-weight: 600;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          a:hover {
            color: #312e81;
            text-decoration: underline;
          }

          /* Avoid breaking inside sections */
          .resume-section,
          .resume-section ul,
          .resume-section li {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* Download button below content */
          .download-btn {
            margin-top: 30px;
            padding: 12px 32px;
            font-size: 14px;
            font-weight: 700;
            background: #4338ca;
            color: white;
            border-radius: 9999px;
            box-shadow: 0 8px 16px rgba(67, 56, 202, 0.35);
            border: none;
            cursor: pointer;
            user-select: none;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          .download-btn:hover {
            background: #312e81;
            transform: translateY(-2px);
          }
          .download-btn:active {
            transform: translateY(0);
          }
        `}
      </style>

      {/* Resume Container */}
      <div ref={resumeRef} className="resume-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <header>
            <h1>{personalInfo.fullName || 'Your Name'}</h1>
            <div className="contact-info" aria-label="Contact Information">
              {personalInfo.email && <span>Email: {personalInfo.email}</span>}
              {personalInfo.phone && <span>Phone: {personalInfo.phone}</span>}
              {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
              {personalInfo.address && <span>Address: {personalInfo.address}</span>}
            </div>
          </header>

          {summary && (
            <section className="resume-section" aria-label="Summary Section">
              <h2 className="section-title">Summary</h2>
              <p>{summary}</p>
            </section>
          )}

          <section className="resume-section" aria-label="Skills Section">
            <h2 className="section-title">Skills</h2>
            {Object.entries(skillsByCategory).map(([cat, arr]) => (
              <div key={cat} style={{ marginBottom: '16px' }}>
                <h3>{cat}</h3>
                <div>
                  {arr.map((s) => (
                    <span key={s.id} className="skill-badge">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </aside>

        {/* Main content */}
        <main className="content">
          {/* Experience */}
          <section className="resume-section" aria-label="Experience Section">
            <h2 className="section-title">Experience</h2>
            <ul>
              {experience.map((e) => (
                <li key={e.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h3>{e.position}</h3>
                    <span style={{ color: '#64748b', fontSize: '9px' }}>
                      {formatDate(e.startDate)} – {e.current ? 'Present' : formatDate(e.endDate)}
                    </span>
                  </div>
                  <p style={{ fontStyle: 'italic', color: '#6366f1', marginBottom: '8px' }}>{e.company}</p>
                  <ul>
                    {e.bulletPoints.slice(0, 3).map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section className="resume-section" aria-label="Education Section">
            <h2 className="section-title">Education</h2>
            <ul>
              {education.map((ed) => (
                <li key={ed.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h3>
                      {ed.degree}
                      {ed.field ? `, ${ed.field}` : ''}
                    </h3>
                    <span style={{ color: '#64748b', fontSize: '9px' }}>
                      {formatDate(ed.startDate)} – {formatDate(ed.endDate)}
                    </span>
                  </div>
                  <p style={{ fontStyle: 'italic', color: '#6366f1', marginBottom: '6px' }}>{ed.school}</p>
                  {ed.gpa && <p style={{ fontWeight: '600', color: '#475569' }}>GPA: {ed.gpa}</p>}
                  {ed.description && <p style={{ fontStyle: 'italic', color: '#475569' }}>{ed.description}</p>}
                </li>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <section className="resume-section" aria-label="Projects Section">
            <h2 className="section-title">Projects</h2>
            <ul>
              {projects.map((p) => (
                <li key={p.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h3>{p.title}</h3>
                    <span style={{ color: '#64748b', fontSize: '9px' }}>
                      {formatDate(p.startDate)} – {formatDate(p.endDate)}
                    </span>
                  </div>
                  <p>{p.description}</p>
                  {p.technologies.length > 0 && (
                    <div style={{ marginTop: '6px' }}>
                      {p.technologies.map((t, i) => (
                        <span key={i} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: '8px', fontSize: '9px' }}>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ marginRight: '14px' }}>
                        Demo
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer">
                        Code
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>

      {/* Download PDF Button */}
      <button onClick={downloadPdf} className="download-btn" aria-label="Download Resume as PDF">
        Download Resume (PDF)
      </button>
    </div>
  );
}
