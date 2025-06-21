// app/page.tsx or pages/resume.tsx
import { Navbar } from '@/components/Navbar';
import { ResponsiveLayout } from '@/components/ResponsiveLayout';

export default function ResumeBuilderPage() {
  return (
    <>
      <Navbar />
      <ResponsiveLayout />
    </>
  );
}
