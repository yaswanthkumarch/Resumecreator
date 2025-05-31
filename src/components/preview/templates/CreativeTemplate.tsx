
import React from 'react';
import { ResumeData } from '@/contexts/ResumeContext';
import { Mail, Phone, Link, MapPin, Star } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalInfo, summary, education, experience, skills, projects } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderStars = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= level ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="p-6 font-playfair max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-4xl font-bold mb-3">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded mr-3"></div>
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed italic">{summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded mr-3"></div>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-purple-600 rounded-full"></div>
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-purple-200"></div>
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-purple-700 font-semibold">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.bulletPoints.length > 0 && (
                      <ul className="space-y-1 text-gray-700">
                        {exp.bulletPoints.map((point, index) => 
                          point.trim() && (
                            <li key={index} className="flex items-start">
                              <span className="text-purple-600 mr-2">▪</span>
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded mr-3"></div>
                Featured Projects
              </h2>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="border-l-4 border-purple-600 pl-4 bg-purple-50 p-4 rounded-r">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{project.title}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4 text-sm">
                      {project.link && (
                        <a href={project.link} className="text-purple-700 hover:underline font-medium">
                          🔗 Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} className="text-purple-700 hover:underline font-medium">
                          📁 GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded mr-3"></div>
                Skills
              </h2>
              <div className="space-y-4">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{skill.name}</span>
                          {renderStars(skill.level)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded mr-3"></div>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-purple-300 pl-4">
                    <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                    {edu.field && <p className="text-gray-700 text-sm">{edu.field}</p>}
                    <p className="text-purple-700 font-medium text-sm">{edu.school}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                    {edu.description && (
                      <p className="text-xs text-gray-600 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
