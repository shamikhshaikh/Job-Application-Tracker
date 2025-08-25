import React from 'react';
import { Link } from 'react-router-dom';
import { JobApplication } from '../types';
import { formatDate } from '../utils/helpers';

interface JobCardProps {
  job: JobApplication;
  index: number;
}

const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
  const getStatusIcon = (status: JobApplication['status']) => {
    switch (status) {
      case 'Applied': return '📝';
      case 'Interviewing': return '🤝';
      case 'Offer': return '🎉';
      case 'Rejected': return '❌';
      default: return '📋';
    }
  };

  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'Applied': return 'from-purple-500 to-cyan-500';
      case 'Interviewing': return 'from-amber-500 to-orange-500';
      case 'Offer': return 'from-emerald-500 to-teal-500';
      case 'Rejected': return 'from-red-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <Link to={`/job/${job.id}`} className="block">
      <div className="group relative card hover-lift cursor-pointer overflow-hidden neon-glow hover:neon-glow-purple transition-all duration-500">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(job.status)} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        
        {/* Status indicator line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getStatusColor(job.status)} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>

        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            {/* Company Logo */}
            <div className="relative group/logo">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg neon-glow group-hover/logo:neon-glow-purple transition-all duration-300 group-hover/logo:scale-110">
                <span className="text-lg sm:text-xl md:text-2xl font-black text-white font-futuristic">
                  {job.companyName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl blur opacity-30 group-hover/logo:opacity-50 transition-opacity duration-300"></div>
            </div>

            {/* Status Badge */}
            <div className="flex flex-col items-end space-y-2">
              <div className={`status-badge status-${job.status.toLowerCase()} neon-glow group-hover:scale-110 transition-transform duration-300 px-2 sm:px-3 md:px-4 py-1 sm:py-2`}>
                <span className="text-base sm:text-lg md:text-xl animate-pulse-glow mr-1 sm:mr-2">{getStatusIcon(job.status)}</span>
                <span className="font-black text-xs sm:text-sm font-modern">{job.status}</span>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="space-y-4 sm:space-y-6">
            {/* Job Title */}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2 sm:mb-3 group-hover:gradient-text transition-all duration-300 font-futuristic leading-tight">
                {job.jobTitle}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 font-bold mb-3 sm:mb-4 group-hover:text-white transition-colors duration-300 font-modern">
                {job.companyName}
              </p>
            </div>

            {/* Application Details */}
            <div className="bg-black/60 rounded-2xl border border-purple-500/20 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400 font-medium font-modern">Applied Date</span>
                </div>
                <span className="text-sm sm:text-base md:text-lg font-bold text-white font-modern">
                  {formatDate(job.applicationDate)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400 font-medium font-modern">Last Updated</span>
                </div>
                <span className="text-sm sm:text-base md:text-lg font-bold text-white font-modern">
                  {formatDate(job.updatedAt)}
                </span>
              </div>
            </div>

            {/* Notes Section */}
            {job.notes && (
              <div className="border-t border-purple-500/20 pt-4 sm:pt-6">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 font-medium mb-1 sm:mb-2 font-modern">Notes</p>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-modern line-clamp-3">
                      {job.notes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Indicator */}
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full neon-glow animate-pulse-glow flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Hover glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>
        </div>

        {/* Floating particles on hover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-pulse-glow" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-pink-400 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-300 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-4 right-4 w-1 h-1 bg-pink-300 rounded-full animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
