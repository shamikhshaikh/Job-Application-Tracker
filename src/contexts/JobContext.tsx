import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { JobApplication, JobFormData, JobContextType } from '../types';

// Action types
type JobAction =
  | { type: 'ADD_JOB'; payload: JobApplication }
  | { type: 'UPDATE_JOB'; payload: { id: string; job: JobApplication } }
  | { type: 'DELETE_JOB'; payload: string }
  | { type: 'SET_JOBS'; payload: JobApplication[] };

// Initial state
const initialState: JobApplication[] = [];

// Reducer function
function jobReducer(state: JobApplication[], action: JobAction): JobApplication[] {
  switch (action.type) {
    case 'ADD_JOB':
      return [...state, action.payload];
    case 'UPDATE_JOB':
      return state.map(job => 
        job.id === action.payload.id ? action.payload.job : job
      );
    case 'DELETE_JOB':
      return state.filter(job => job.id !== action.payload);
    case 'SET_JOBS':
      return action.payload;
    default:
      return state;
  }
}

// Create context
const JobContext = createContext<JobContextType | undefined>(undefined);

// Provider component
export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, dispatch] = useReducer(jobReducer, initialState);

  // Load jobs from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobApplications');
    if (savedJobs) {
      try {
        const parsedJobs = JSON.parse(savedJobs);
        dispatch({ type: 'SET_JOBS', payload: parsedJobs });
      } catch (error) {
        console.error('Error loading jobs from localStorage:', error);
      }
    }
  }, []);

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
  }, [jobs]);

  // Generate unique ID
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Add new job
  const addJob = (jobData: JobFormData) => {
    const newJob: JobApplication = {
      ...jobData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_JOB', payload: newJob });
  };

  // Update existing job
  const updateJob = (id: string, jobData: JobFormData) => {
    const existingJob = jobs.find(job => job.id === id);
    if (existingJob) {
      const updatedJob: JobApplication = {
        ...existingJob,
        ...jobData,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_JOB', payload: { id, job: updatedJob } });
    }
  };

  // Delete job
  const deleteJob = (id: string) => {
    dispatch({ type: 'DELETE_JOB', payload: id });
  };

  // Export jobs to JSON file
  const exportJobs = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import jobs from JSON file
  const importJobs = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedJobs = JSON.parse(content);
          
          // Validate imported data
          if (Array.isArray(importedJobs)) {
            const validJobs = importedJobs.filter(job => 
              job.companyName && 
              job.jobTitle && 
              job.status && 
              job.applicationDate
            );
            
            if (validJobs.length > 0) {
              // Add timestamps to imported jobs
              const processedJobs = validJobs.map(job => ({
                ...job,
                id: generateId(),
                createdAt: job.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }));
              
              dispatch({ type: 'SET_JOBS', payload: processedJobs });
              resolve();
            } else {
              reject(new Error('No valid job data found in file'));
            }
          } else {
            reject(new Error('Invalid file format'));
          }
        } catch (error) {
          reject(new Error('Error parsing JSON file'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  };

  const value: JobContextType = {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    exportJobs,
    importJobs,
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};

// Custom hook to use the job context
export const useJobs = (): JobContextType => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
