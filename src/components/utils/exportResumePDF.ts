import { templates } from '@/components/preview/templates';
import { ResumeData } from '@/contexts/ResumeContext';
import { TemplateKey } from '@/contexts/TemplateContext';

/**
 * Waits for an element matching the selector to appear in the DOM.
 * Tries `maxRetries` times, waiting `delay` ms between each try.
 * @param selector CSS selector of the element to wait for
 * @param maxRetries Number of attempts before giving up
 * @param delay Delay between attempts in milliseconds
 * @returns The found HTMLElement
 * @throws Error if element not found after retries
 */
async function waitForResumePreview(
  selector: string,
  maxRetries = 10,
  delay = 300
): Promise<HTMLElement> {
  for (let i = 0; i < maxRetries; i++) {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (el) return el;
    await new Promise(res => setTimeout(res, delay));
  }
  throw new Error(`Element with selector "${selector}" not found after ${maxRetries} retries`);
}

/**
 * Generates and exports the resume PDF using the specified template and data.
 * Waits for the resume preview element to be rendered in the DOM before generation.
 * @param templateKey Key identifying which template to use
 * @param resumeData The resume data to generate PDF from
 */
export async function exportResumePDF(templateKey: TemplateKey, resumeData: ResumeData) {
  const template = templates[templateKey];

  console.log('Exporting PDF...');
  console.log('Template key:', templateKey);
  console.log('Template found:', !!template);
  console.log('Has PDF generator:', !!template?.generatePDF);

  if (!template || !template.generatePDF) {
    throw new Error(`No PDF generator found for template "${templateKey}"`);
  }

  // Ensure the resume preview is present in the DOM before generating PDF
  try {
    await waitForResumePreview('#resume-preview');
  } catch (error) {
    console.error('Resume preview waiting failed:', error);
    throw error;
  }

  // Generate the PDF using the template's generator function
  await template.generatePDF(resumeData);
}
