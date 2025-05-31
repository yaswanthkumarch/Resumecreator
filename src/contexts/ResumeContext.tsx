
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  address: string;
  photo?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bulletPoints: string[];
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  selectedTemplate: 'modern' | 'classic' | 'creative' | 'minimalist' | 'executive' | 'professional' | 'compact' | 'two-column';
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    address: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
  selectedTemplate: 'modern',
};

type ResumeAction = 
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_TEMPLATE'; payload: 'modern' | 'classic' | 'creative' | 'minimalist' | 'executive' | 'professional' | 'compact' | 'two-column' }
  | { type: 'LOAD_DATA'; payload: ResumeData }
  | { type: 'RESET_DATA' };

function resumeReducer(state: ResumeData, action: ResumeAction): ResumeData {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      };
    case 'UPDATE_SUMMARY':
      return { ...state, summary: action.payload };
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload]
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(edu => 
          edu.id === action.payload.id 
            ? { ...edu, ...action.payload.data }
            : edu
        )
      };
    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload)
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, action.payload]
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map(exp => 
          exp.id === action.payload.id 
            ? { ...exp, ...action.payload.data }
            : exp
        )
      };
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter(exp => exp.id !== action.payload)
      };
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.payload]
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(skill => 
          skill.id === action.payload.id 
            ? { ...skill, ...action.payload.data }
            : skill
        )
      };
    case 'DELETE_SKILL':
      return {
        ...state,
        skills: state.skills.filter(skill => skill.id !== action.payload)
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project => 
          project.id === action.payload.id 
            ? { ...project, ...action.payload.data }
            : project
        )
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload)
      };
    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'LOAD_DATA':
      return action.payload;
    case 'RESET_DATA':
      return initialResumeData;
    default:
      return state;
  }
}

interface ResumeContextType {
  resumeData: ResumeData;
  dispatch: React.Dispatch<ResumeAction>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, dispatch] = useReducer(resumeReducer, initialResumeData);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading resume data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <ResumeContext.Provider value={{ resumeData, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
