import React, { useState } from 'react';
import { Mail, Phone, Link, MapPin } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

interface Education {
  id: string;
  degree: string;
  field?: string;
  school: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  bulletPoints: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  technologies: string[];
  link?: string;
  github?: string;
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    address?: string;
  };
  summary?: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
}

const sampleData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    linkedin: 'linkedin.com/in/johndoe',
    address: '123 Main St, City, Country',
  },
  summary:
    'Passionate software engineer skilled in crafting efficient, scalable web applications with modern technologies.',
  education: [
    {
      id: 'edu1',
      degree: 'B.Sc. Computer Science',
      school: 'State University',
      startDate: '2015-09',
      endDate: '2019-06',
      gpa: '3.8',
    },
  ],
  experience: [
    {
      id: 'exp1',
      position: 'Senior Software Engineer',
      company: 'Tech Corp',
      startDate: '2020-01',
      current: true,
      bulletPoints: [
        'Led React front-end development and improved performance by 30%.',
        'Mentored junior developers and improved code quality.',
      ],
    },
    {
      id: 'exp2',
      position: 'Software Engineer',
      company: 'Web Solutions',
      startDate: '2019-07',
      endDate: '2019-12',
      bulletPoints: [
        'Developed responsive dashboards using React and Redux.',
        'Collaborated closely with API backend teams.',
      ],
    },
  ],
  skills: [
    { id: 'skill1', name: 'React', level: 5, category: 'Frontend' },
    { id: 'skill2', name: 'TypeScript', level: 4, category: 'Frontend' },
    { id: 'skill3', name: 'Node.js', level: 4, category: 'Backend' },
  ],
  projects: [
    {
      id: 'proj1',
      title: 'Portfolio Website',
      description: 'Personal site showcasing projects and blogs.',
      startDate: '2021-05',
      endDate: '2021-07',
      technologies: ['React', 'Tailwind CSS'],
      link: 'https://example.com',
      github: 'https://github.com/johndoe/portfolio',
    },
  ],
};

export function TwoColumnTemplate({ data = sampleData }: { data?: ResumeData }) {
  const { personalInfo, summary, education, experience, skills, projects } = data;
  const [loadingPDF, setLoadingPDF] = useState(false);

  const formatDate = (date?: string) =>
    date
      ? new Date(date + '-01').toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      : '';

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const downloadPDF = async () => {
    const el = document.getElementById('resume');
    if (!el) return alert('Resume element missing');

    setLoadingPDF(true);
    try {
      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#fff',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = { width: canvas.width, height: canvas.height };
      const scale = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);

      pdf.addImage(imgData, 'PNG', 0, 0, imgProps.width * scale, imgProps.height * scale);
      pdf.save(`${personalInfo.fullName || 'resume'}.pdf`);
    } catch (error) {
      alert('Failed to generate PDF');
      console.error(error);
    }
    setLoadingPDF(false);
  };

  return (
    <>
      <div
        id="resume"
        style={{
          fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          display: 'flex',
          width: '210mm',
          height: '297mm',
          backgroundColor: '#fff',
          color: '#1e293b',
          boxSizing: 'border-box',
          padding: 32,
          userSelect: 'none',
          borderRadius: 12,
          boxShadow: '0 16px 30px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          gap: 24,
        }}
      >
        {/* LEFT COLUMN */}
        <aside
          style={{
            width: '32%',
            backgroundColor: '#1e293b',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 28px',
            boxSizing: 'border-box',
            borderRadius: 12,
            boxShadow: 'inset 0 0 30px rgba(255,255,255,0.05)',
          }}
        >
          <div>
            <h1
              style={{
                fontWeight: 900,
                fontSize: 36,
                marginBottom: 16,
                letterSpacing: '3px',
                lineHeight: 1.1,
                color: '#93c5fd',
              }}
            >
              {personalInfo.fullName || 'Your Name'}
            </h1>

            <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 36, color: '#cbd5e1' }}>
              {personalInfo.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Mail size={18} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Phone size={18} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Link size={18} />
                  <a
                    href={
                      personalInfo.linkedin.startsWith('http')
                        ? personalInfo.linkedin
                        : 'https://' + personalInfo.linkedin
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#93c5fd',
                      textDecoration: 'underline',
                      wordBreak: 'break-word',
                    }}
                  >
                    {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {personalInfo.address && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MapPin size={18} />
                  <span>{personalInfo.address}</span>
                </div>
              )}
            </div>

            {/* Skills */}
            <section style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  borderBottom: '3px solid #93c5fd',
                  paddingBottom: 8,
                  marginBottom: 24,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#93c5fd',
                }}
              >
                Skills
              </h2>
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category} style={{ marginBottom: 28 }}>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      textTransform: 'uppercase',
                      color: '#a5b4fc',
                      marginBottom: 12,
                      letterSpacing: 1,
                    }}
                  >
                    {category}
                  </h3>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                    {skills.map(({ id, name, level }) => (
                      <li
                        key={id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 13,
                          marginBottom: 10,
                          alignItems: 'center',
                          borderRadius: 24,
                          backgroundColor: 'rgba(255,255,255,0.12)',
                          padding: '6px 16px',
                          boxShadow: 'inset 0 0 8px rgba(255,255,255,0.2)',
                          fontWeight: 600,
                        }}
                      >
                        <span>{name}</span>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            backgroundColor: '#4338ca',
                            padding: '3px 12px',
                            borderRadius: 16,
                            fontWeight: 700,
                            fontSize: 12,
                            color: 'white',
                            minWidth: 30,
                            textAlign: 'center',
                            boxShadow: '0 3px 10px rgba(67, 56, 202, 0.8)',
                            letterSpacing: 0.8,
                          }}
                        >
                          {level}/5
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>

          {/* Education */}
          <section>
            <h2
              style={{
                fontWeight: 700,
                fontSize: 15,
                borderTop: '3px solid #93c5fd',
                paddingTop: 14,
                marginTop: 28,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#93c5fd',
              }}
            >
              Education
            </h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  marginBottom: 28,
                  paddingLeft: 14,
                  borderLeft: '4px solid #6366f1',
                }}
              >
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginBottom: 6,
                    color: '#e0e7ff',
                  }}
                >
                  {edu.degree}
                </h3>
                <p style={{ margin: 0, fontSize: 12, color: '#cbd5e1' }}>{edu.school}</p>
                <p
                  style={{
                    margin: '4px 0 0 0',
                    fontSize: 11,
                    fontStyle: 'italic',
                    color: '#a5b4fc',
                  }}
                >
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </p>
                {edu.gpa && (
                  <p style={{ margin: '4px 0 0 0', fontSize: 11, color: '#cbd5e1' }}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </section>
        </aside>

        {/* RIGHT COLUMN */}
        <main
          style={{
            width: '68%',
            paddingLeft: 32,
            boxSizing: 'border-box',
            overflowY: 'auto',
            maxHeight: '100%',
          }}
        >
          {/* Summary */}
          {summary && (
            <section style={{ marginBottom: 32 }}>
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 26,
                  borderBottom: '4px solid #6366f1',
                  paddingBottom: 10,
                  marginBottom: 24,
                  color: '#4338ca',
                  letterSpacing: 2,
                }}
              >
                Summary
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: '#334155',
                  lineHeight: 1.8,
                  fontWeight: 500,
                }}
              >
                {summary}
              </p>
            </section>
          )}

          {/* Experience */}
          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontWeight: 900,
                fontSize: 26,
                borderBottom: '4px solid #6366f1',
                paddingBottom: 10,
                marginBottom: 24,
                color: '#4338ca',
                letterSpacing: 2,
              }}
            >
              Experience
            </h2>

            {experience.map((job) => (
              <article key={job.id} style={{ marginBottom: 32 }}>
                <header
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 12,
                    borderBottom: '1.5px solid #e0e7ff',
                    paddingBottom: 12,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        fontSize: 20,
                        color: '#3730a3',
                      }}
                    >
                      {job.position}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 15,
                        fontWeight: 600,
                        color: '#4c51bf',
                        letterSpacing: 0.6,
                      }}
                    >
                      {job.company}
                    </p>
                  </div>
                  <time
                    style={{
                      fontSize: 12,
                      fontStyle: 'italic',
                      color: '#64748b',
                      whiteSpace: 'nowrap',
                      fontWeight: 500,
                    }}
                    dateTime={`${job.startDate} - ${job.endDate || ''}`}
                  >
                    {formatDate(job.startDate)} — {job.current ? 'Present' : formatDate(job.endDate)}
                  </time>
                </header>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 24,
                    fontSize: 15,
                    color: '#1e293b',
                    listStyleType: 'disc',
                    lineHeight: 1.8,
                    fontWeight: 400,
                  }}
                >
                  {job.bulletPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 26,
                  borderBottom: '4px solid #6366f1',
                  paddingBottom: 10,
                  marginBottom: 24,
                  color: '#4338ca',
                  letterSpacing: 2,
                }}
              >
                Projects
              </h2>
              {projects.map((project) => (
                <article
                  key={project.id}
                  style={{
                    marginBottom: 28,
                    borderLeft: '4px solid #6366f1',
                    paddingLeft: 14,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#4f46e5',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: 14,
                      color: '#475569',
                      lineHeight: 1.5,
                    }}
                  >
                    {project.description}
                  </p>
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      fontStyle: 'italic',
                      color: '#a5b4fc',
                    }}
                  >
                    {formatDate(project.startDate)} — {formatDate(project.endDate)}
                  </p>
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#4338ca',
                    }}
                  >
                    Technologies: {project.technologies.join(', ')}
                  </p>
                  {(project.link || project.github) && (
                    <p style={{ marginTop: 6 }}>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#4f46e5',
                            textDecoration: 'underline',
                            marginRight: 16,
                            fontWeight: 600,
                          }}
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#4f46e5',
                            textDecoration: 'underline',
                            fontWeight: 600,
                          }}
                        >
                          GitHub
                        </a>
                      )}
                    </p>
                  )}
                </article>
              ))}
            </section>
          )}
        </main>
      </div>

      <button
        onClick={downloadPDF}
        disabled={loadingPDF}
        style={{
          marginTop: 24,
          padding: '14px 26px',
          backgroundColor: '#6366f1',
          color: 'white',
          fontWeight: '700',
          fontSize: 16,
          borderRadius: 30,
          border: 'none',
          cursor: loadingPDF ? 'not-allowed' : 'pointer',
          boxShadow: loadingPDF
            ? 'none'
            : '0 6px 16px rgba(99,102,241,0.6)',
          transition: 'background-color 0.3s ease',
          userSelect: 'none',
        }}
        onMouseEnter={(e) => {
          if (!loadingPDF) (e.currentTarget.style.backgroundColor = '#4f46e5');
        }}
        onMouseLeave={(e) => {
          if (!loadingPDF) (e.currentTarget.style.backgroundColor = '#6366f1');
        }}
      >
        {loadingPDF ? 'Generating PDF...' : 'Download PDF'}
      </button>
    </>
  );
}
