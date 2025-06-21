import { ClassicTemplate } from './ClassicTemplate';
import { CompactTemplate } from './CompactTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { MinimalistTemplate } from './MinimalistTemplate';
import { ModernTemplate } from './ModernTemplate';
import { TwoColumnTemplate } from './TwoColumnTemplate';

// import { generateClassicPDF } from './pdf/generateClassicPDF';
// import { generateCompactPDF } from './pdf/generateCompactPDF';
// import { generateCreativePDF } from './pdf/generateCreativePDF';
// import { generateExecutivePDF } from './pdf/generateExecutivePDF';
// import { generateMinimalistPDF } from './pdf/generateMinimalistPDF';
// import { generateModernPDF } from './pdf/generateModernPDF';
import { generateTwoColumnPDF } from './pdf/generateTwoColumnPDF';

export const templates = {
  classic: {
    name: 'Classic',
    component: ClassicTemplate,
    generatePDF: generateTwoColumnPDF,
  },
  compact: {
    name: 'Compact',
    component: CompactTemplate,
    generatePDF: generateTwoColumnPDF,
  },
  creative: {
    name: 'Creative',
    component: CreativeTemplate,
    generatePDF: generateTwoColumnPDF,
  },
  executive: {
    name: 'Executive',
    component: ExecutiveTemplate,
    generatePDF: generateTwoColumnPDF,
  },
  minimalist: {
    name: 'Minimalist',
    component: MinimalistTemplate,
    generatePDF: generateTwoColumnPDF,
  },
  modern: {
    name: 'Modern',
    component: ModernTemplate,
    generatePDF: generateTwoColumnPDF,
  },
  twocolumn: {
    name: 'Two Column',
    component: TwoColumnTemplate,
    generatePDF: generateTwoColumnPDF,
  },
};
