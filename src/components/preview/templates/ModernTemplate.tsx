import React, { useRef, useState, useEffect } from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import { Mail, Phone, Link, MapPin, Github, Twitter, Globe } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface ModernTemplateProps {
  data: ResumeData;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-6">
    <h2 className="text-sm font-bold text-blue-700 uppercase mb-3 tracking-wide border-b border-blue-300 pb-1">
      {title}
    </h2>
    {children}
  </section>
);

// New: StarRating component for skills
const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, i) => {
        const starFill = i < rating ? 'text-yellow-400' : 'text-gray-300';
        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
            className={`w-4 h-4 ${starFill}`}
            aria-hidden="true"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      })}
    </div>
  );
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString + '-01');
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects } = data;
  const resumeRef = useRef<HTMLDivElement>(null);

  const [textColor, setTextColor] = useState('#1F2937'); // Tailwind gray-900
  const [bgColor, setBgColor] = useState('#FFFFFF'); // White
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [fontSize, setFontSize] = useState(11);

  const totalTextLength =
    (summary?.length || 0) +
    education.reduce((acc, edu) => acc + edu.degree.length + (edu.field?.length || 0) + edu.school.length, 0) +
    experience.reduce((acc, exp) => acc + exp.position.length + exp.company.length + exp.bulletPoints.join(' ').length, 0) +
    projects.reduce((acc, proj) => acc + proj.title.length + proj.description.length, 0) +
    skills.reduce((acc, skill) => acc + skill.name.length, 0);

  useEffect(() => {
    if (totalTextLength > 6000) {
      setFontSize(9);
    } else if (totalTextLength > 4000) {
      setFontSize(10);
    } else {
      setFontSize(11);
    }
  }, [totalTextLength]);

  const handleDownloadClick = () => {
    setShowColorPicker(true);
  };

  const confirmDownload = () => {
    setShowColorPicker(false);
    if (!resumeRef.current) return;

    const fileName = personalInfo.fullName
      ? `${personalInfo.fullName.trim().replace(/\s+/g, '_')}_Resume.pdf`
      : 'resume.pdf';

    html2pdf()
      .set({
        margin: [15, 15, 15, 15],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, scrollY: -window.scrollY },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      })
      .from(resumeRef.current)
      .save();
  };

  return (
   <div
        id="compact-template-root"
        className="max-h-[85vh] overflow-auto p-10 bg-white text-gray-900 text-base min-w-[820px] shadow-xl rounded-2xl border border-gray-300"
        style={{ boxShadow: '0 20px 45px rgba(99, 102, 241, 0.15)' }}
      >
      <div
        ref={resumeRef}
        className="bg-white rounded-md shadow-lg border border-gray-300 flex flex-col md:flex-row w-full max-w-4xl overflow-hidden"
        style={{ color: textColor, backgroundColor: bgColor }}
      >
        {/* Left Sidebar */}
        <aside className="p-6 w-full md:w-1/3 flex flex-col gap-8 bg-blue-700 text-white">
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight break-words">
            {personalInfo.fullName || 'Your Name'}
          </h1>

          {/* Contact info */}
          <div className="flex flex-col gap-3 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline break-words text-white">
                  {personalInfo.email}
                </a>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <a href={`tel:${personalInfo.phone}`} className="hover:underline text-white">
                  {personalInfo.phone}
                </a>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            <div className="flex gap-5 mt-4">
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="hover:text-blue-300 transition"
                  aria-label="LinkedIn Profile"
                >
                  <Link className="w-6 h-6" />
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="hover:text-blue-300 transition"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {personalInfo.twitter && (
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                  className="hover:text-blue-300 transition"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
              {personalInfo.website && (
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Website"
                  className="hover:text-blue-300 transition"
                  aria-label="Website"
                >
                  <Globe className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education">
              <div className="space-y-3 text-white text-sm">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold">
                      {edu.degree}
                      {edu.field ? `, ${edu.field}` : ''}
                    </p>
                    <p className="italic text-blue-300">{edu.school}</p>
                    <p className="text-xs">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-xs">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Skills with ratings */}
          {skills.length > 0 && (
            <Section title="Skills">
              <div className="flex flex-col gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex justify-between items-center bg-blue-300 bg-opacity-20 rounded px-3 py-1"
                    title={`${skill.name} - proficiency: ${skill.proficiency || 'N/A'}`}
                  >
                    <span className="text-blue-900 font-semibold">{skill.name}</span>
                    {/* rating from skill.proficiency: assuming 1-5 */}
                    <StarRating rating={skill.proficiency ?? 0} />
                  </div>
                ))}
              </div>
            </Section>
          )}
        </aside>

        {/* Main content */}
        <main className="p-8 w-full md:w-2/3 overflow-auto flex flex-col gap-8" style={{ color: textColor }}>
          {/* Summary */}
          {summary && (
            <Section title="Professional Summary">
              <p className="text-justify leading-relaxed">{summary}</p>
            </Section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <Section title="Experience">
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-base">{exp.position}</h3>
                      <span className="text-xs whitespace-nowrap">
                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="italic text-blue-600 mb-2">{exp.company}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {exp.bulletPoints.slice(0, 3).map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Section title="Projects">
              <div className="space-y-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 border border-gray-300 rounded shadow-sm hover:shadow-md transition cursor-default"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-base">{project.title}</h3>
                      <span className="text-xs whitespace-nowrap">
                        {formatDate(project.startDate)} – {formatDate(project.endDate)}
                      </span>
                    </div>
                    <p className="text-sm">{project.description}</p>
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
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </main>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadClick}
        className="mt-8 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded shadow-md transition"
        aria-label="Download Resume PDF"
      >
        Download Resume PDF
      </button>

      {/* Color Picker Modal */}
      {showColorPicker && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          aria-modal="true"
          role="dialog"
          aria-labelledby="color-picker-title"
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 id="color-picker-title" className="text-xl font-bold mb-4">
              Choose Text and Background Colors
            </h2>
            <div className="flex flex-col gap-4 mb-6">
              <label className="flex flex-col">
                Text Color:
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="mt-1 w-20 h-10 cursor-pointer"
                  aria-label="Select text color"
                />
              </label>
              <label className="flex flex-col">
                Background Color:
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="mt-1 w-20 h-10 cursor-pointer"
                  aria-label="Select background color"
                />
              </label>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowColorPicker(false)}
                className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDownload}
                className="py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
