import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '@/contexts/ResumeContext';

async function waitForElement(selector: string, retries = 10, delay = 300): Promise<HTMLElement> {
  for (let i = 0; i < retries; i++) {
    const el = document.querySelector(selector) as HTMLElement;
    if (el && el.offsetHeight > 0) return el;
    await new Promise(res => setTimeout(res, delay));
  }
  throw new Error('Resume preview not found or not visible');
}

export async function generateTwoColumnPDF(data: ResumeData) {
  const element = await waitForElement('#resume-preview');
  const canvas = await html2canvas(element, { scale: 2 });

  if (!canvas || canvas.width === 0 || canvas.height === 0) {
    throw new Error('Generated canvas is empty');
  }

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
  const imgWidth = canvas.width * ratio;
  const imgHeight = canvas.height * ratio;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(`${data.personalInfo?.fullName || 'resume'}.pdf`);
}
