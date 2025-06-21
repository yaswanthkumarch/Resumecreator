import React, { createContext, useContext, useState } from 'react';

type TemplateKey =
  | 'classic'
  | 'compact'
  | 'creative'
  | 'executive'
  | 'minimalist'
  | 'modern'
  | 'twocolumn';

const TemplateContext = createContext<{
  selectedTemplate: TemplateKey;
  setSelectedTemplate: (key: TemplateKey) => void;
}>({
  selectedTemplate: 'twocolumn',
  setSelectedTemplate: () => {},
});

export const useTemplate = () => useContext(TemplateContext);

export const TemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('twocolumn');
  return (
    <TemplateContext.Provider value={{ selectedTemplate, setSelectedTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};
