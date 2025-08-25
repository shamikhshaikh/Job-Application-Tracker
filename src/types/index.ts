export interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  applicationDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFormData {
  companyName: string;
  jobTitle: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  applicationDate: string;
  notes: string;
}

export interface JobContextType {
  jobs: JobApplication[];
  addJob: (job: JobFormData) => void;
  updateJob: (id: string, job: JobFormData) => void;
  deleteJob: (id: string) => void;
  exportJobs: () => void;
  importJobs: (file: File) => Promise<void>;
}
