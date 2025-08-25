import { JobApplication } from '../types';

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Get status color classes for modern design
export const getStatusColor = (status: JobApplication['status']): string => {
  switch (status) {
    case 'Applied':
      return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    case 'Interviewing':
      return 'bg-amber-500/20 text-amber-300 border-amber-400/30';
    case 'Offer':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
    case 'Rejected':
      return 'bg-red-500/20 text-red-300 border-red-400/30';
    default:
      return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
  }
};

// Get status icon with modern emojis
export const getStatusIcon = (status: JobApplication['status']): string => {
  switch (status) {
    case 'Applied':
      return '📝';
    case 'Interviewing':
      return '🤝';
    case 'Offer':
      return '🎉';
    case 'Rejected':
      return '❌';
    default:
      return '📋';
  }
};

// Sort jobs by date (newest first)
export const sortJobsByDate = (jobs: JobApplication[]): JobApplication[] => {
  return [...jobs].sort((a, b) => 
    new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()
  );
};

// Filter jobs by status
export const filterJobsByStatus = (jobs: JobApplication[], status: JobApplication['status'] | 'All'): JobApplication[] => {
  if (status === 'All') return jobs;
  return jobs.filter(job => job.status === status);
};

// Get all available statuses
export const getAllStatuses = (): JobApplication['status'][] => {
  return ['Applied', 'Interviewing', 'Offer', 'Rejected'];
};

// Search jobs by company name or job title
export const searchJobs = (jobs: JobApplication[], query: string): JobApplication[] => {
  if (!query.trim()) return jobs;
  const lowercaseQuery = query.toLowerCase();
  return jobs.filter(job => 
    job.companyName.toLowerCase().includes(lowercaseQuery) ||
    job.jobTitle.toLowerCase().includes(lowercaseQuery)
  );
};

// Get status priority for sorting
export const getStatusPriority = (status: JobApplication['status']): number => {
  switch (status) {
    case 'Offer': return 1;
    case 'Interviewing': return 2;
    case 'Applied': return 3;
    case 'Rejected': return 4;
    default: return 5;
  }
};

// Sort jobs by priority and date
export const sortJobsByPriority = (jobs: JobApplication[]): JobApplication[] => {
  return [...jobs].sort((a, b) => {
    const priorityDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
    if (priorityDiff !== 0) return priorityDiff;
    
    // If same priority, sort by date (newest first)
    return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
  });
};

// Get relative time (e.g., "2 days ago")
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

// Get status description
export const getStatusDescription = (status: JobApplication['status']): string => {
  switch (status) {
    case 'Applied':
      return 'Application submitted, waiting for response';
    case 'Interviewing':
      return 'In the interview process';
    case 'Offer':
      return 'Job offer received!';
    case 'Rejected':
      return 'Application not selected';
    default:
      return 'Status unknown';
  }
};
