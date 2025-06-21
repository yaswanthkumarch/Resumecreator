'use client';

import React from 'react';
import jsPDF from 'jspdf';
import { toast } from '@/hooks/use-toast';
import { ResumeData } from '@/contexts/ResumeContext';
import { CompactTemplate } from './preview/templates/CompactTemplate';

interface CompactTemplateWithPDFProps {
  data: ResumeData;
}

export function CompactTemplateWithPDF({ data }: CompactTemplateWithPDFProps) {
  const PAGE_HEIGHT = 297; // mm, A4
  const PAGE_WIDTH = 210;
  const MARGIN = 15;
  const LINE_HEIGHT = 7;

  // Helper to add text and auto paginate if needed
  const addText = (pdf: jsPDF, text: string | string[], x: number, y: number) => {
    if (Array.isArray(text)) {
      text.forEach((line) => {
        if (y > PAGE_HEIGHT - MARGIN) {
          pdf.addPage();
          y = MARGIN;
        }
        pdf.text(line, x, y);
        y += LINE_HEIGHT;
      });
    } else {
      if (y > PAGE_HEIGHT - MARGIN) {
        pdf.addPage();
        y = MARGIN;
      }
      pdf.text(text, x, y);
      y += LINE_HEIGHT;
    }
    return y;
  };

  // Prevent content being cut off by adding page if not enough space for `linesNeeded`
  const checkPageBreak = (pdf: jsPDF, y: number, linesNeeded: number) => {
    if (y + linesNeeded * LINE_HEIGHT > PAGE_HEIGHT - MARGIN) {
      pdf.addPage();
      return MARGIN;
    }
    return y;
  };

  const handleExportPDF = () => {
    try {
      toast({ title: 'Generating PDF', description: 'Preparing your resume...' });

      const pdf = new jsPDF('p', 'mm', 'a4');
      let yPos = MARGIN;

      const personalInfo = data.personalInfo || {};
      const fullName = personalInfo.fullName || 'Your Name';

      // Title: Full Name
      pdf.setFontSize(22);
      pdf.setTextColor('#333');
      yPos = addText(pdf, fullName, MARGIN, yPos);

      yPos += 5;

      // Contact Info
      pdf.setFontSize(12);
      pdf.setTextColor('#555');

      const contactLines = [];
      if (personalInfo.email) contactLines.push(`Email: ${personalInfo.email}`);
      if (personalInfo.phone) contactLines.push(`Phone: ${personalInfo.phone}`);
      if (personalInfo.linkedin) contactLines.push(`LinkedIn: ${personalInfo.linkedin}`);
      if (personalInfo.address) contactLines.push(`Address: ${personalInfo.address}`);

      yPos = addText(pdf, contactLines, MARGIN, yPos);

      yPos += 5;

      // Separator line
      if (yPos > PAGE_HEIGHT - MARGIN) {
        pdf.addPage();
        yPos = MARGIN;
      }
      pdf.setDrawColor(0);
      pdf.setLineWidth(0.5);
      pdf.line(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos);
      yPos += 10;

      // Summary
      if (data.summary) {
        yPos = checkPageBreak(pdf, yPos, 4); // title + a few lines of summary

        pdf.setFontSize(16);
        pdf.setTextColor('#222');
        yPos = addText(pdf, 'Summary', MARGIN, yPos);

        pdf.setFontSize(12);
        const splitSummary = pdf.splitTextToSize(data.summary, PAGE_WIDTH - 2 * MARGIN);
        yPos = addText(pdf, splitSummary, MARGIN, yPos);

        yPos += 5;
      }

      // Experience
      if (data.experience.length) {
        yPos = checkPageBreak(pdf, yPos, 3); // heading + at least 1 job

        pdf.setFontSize(16);
        pdf.setTextColor('#222');
        yPos = addText(pdf, 'Experience', MARGIN, yPos);

        pdf.setFontSize(12);
        data.experience.forEach((job) => {
          const start = job.startDate ? new Date(job.startDate).getFullYear() : '';
          const end = job.current ? 'Present' : job.endDate ? new Date(job.endDate).getFullYear() : '';
          const jobLine = `${job.position} — ${job.company} (${start} - ${end})`;
          yPos = addText(pdf, jobLine, MARGIN, yPos);

          if (job.bulletPoints?.length) {
            job.bulletPoints.forEach((point) => {
              const details = pdf.splitTextToSize(`• ${point}`, PAGE_WIDTH - 2 * MARGIN - 5);
              yPos = addText(pdf, details, MARGIN + 5, yPos);
            });
          }
          yPos += 5;
        });

        yPos += 5;
      }

      // Education
      if (data.education.length) {
        yPos = checkPageBreak(pdf, yPos, 3); // heading + one edu item

        pdf.setFontSize(16);
        pdf.setTextColor('#222');
        yPos = addText(pdf, 'Education', MARGIN, yPos);

        pdf.setFontSize(12);
        data.education.forEach((edu) => {
          const start = edu.startDate ? new Date(edu.startDate).getFullYear() : '';
          const end = edu.endDate ? new Date(edu.endDate).getFullYear() : '';
          const eduLine = `${edu.degree}${edu.field ? ` in ${edu.field}` : ''} — ${edu.school} (${start} - ${end})`;
          yPos = addText(pdf, eduLine, MARGIN, yPos);

          if (edu.gpa) {
            yPos = addText(pdf, `GPA: ${edu.gpa}`, MARGIN + 5, yPos);
          }
          yPos += 5;
        });

        yPos += 5;
      }

      // Skills
      if (data.skills.length) {
        yPos = checkPageBreak(pdf, yPos, 3);

        pdf.setFontSize(16);
        pdf.setTextColor('#222');
        yPos = addText(pdf, 'Skills', MARGIN, yPos);

        pdf.setFontSize(12);
        const skillsByCategory = data.skills.reduce<Record<string, string[]>>((acc, skill) => {
          if (!skill.category) return acc;
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill.name);
          return acc;
        }, {});

        for (const category in skillsByCategory) {
          yPos = addText(pdf, `${category}:`, MARGIN + 5, yPos);
          const skillsText = skillsByCategory[category].join(', ');
          const splitSkills = pdf.splitTextToSize(skillsText, PAGE_WIDTH - 2 * MARGIN - 10);
          yPos = addText(pdf, splitSkills, MARGIN + 10, yPos);
          yPos += 3;
        }
        yPos += 5;
      }

      // Projects
      if (data.projects.length) {
        yPos = checkPageBreak(pdf, yPos, 3);

        pdf.setFontSize(16);
        pdf.setTextColor('#222');
        yPos = addText(pdf, 'Projects', MARGIN, yPos);

        pdf.setFontSize(12);
        data.projects.forEach((project) => {
          const start = project.startDate ? new Date(project.startDate).getFullYear() : '';
          const end = project.endDate ? new Date(project.endDate).getFullYear() : '';
          const projectLine = `${project.title} (${start} - ${end})`;
          yPos = addText(pdf, projectLine, MARGIN, yPos);

          if (project.description) {
            const descriptionLines = pdf.splitTextToSize(project.description, PAGE_WIDTH - 2 * MARGIN - 5);
            yPos = addText(pdf, descriptionLines, MARGIN + 5, yPos);
          }
          if (project.technologies?.length) {
            const techText = 'Technologies: ' + project.technologies.join(', ');
            const techLines = pdf.splitTextToSize(techText, PAGE_WIDTH - 2 * MARGIN - 5);
            yPos = addText(pdf, techLines, MARGIN + 5, yPos);
          }
          yPos += 5;
        });

        yPos += 5;
      }

      // Save file
      const fileName = fullName.replace(/\s+/g, '_') + '_Resume.pdf';
      pdf.save(fileName);

      toast({ title: 'Download Successful', description: 'Your resume PDF is ready.' });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({ title: 'Export Failed', description: 'Failed to generate PDF.', variant: 'destructive' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded shadow">
      <button
        onClick={handleExportPDF}
        className="mb-6 px-5 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
      >
        Download Resume PDF
      </button>

      <CompactTemplate data={data} />
    </div>
  );
}
