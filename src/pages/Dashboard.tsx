import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';
import JobCard from '../components/JobCard';
import { sortJobsByDate, filterJobsByStatus, searchJobs, getAllStatuses } from '../utils/helpers';
import { JobApplication } from '../types';

const Dashboard: React.FC = () => {
  const { jobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | JobApplication['status']>('All');
  const [isVisible, setIsVisible] = useState(false);

  // Animate dashboard on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = jobs;
    
    // Apply search filter
    if (searchQuery) {
      result = searchJobs(result, searchQuery);
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = filterJobsByStatus(result, statusFilter);
    }
    
    // Sort by date (newest first)
    return sortJobsByDate(result);
  }, [jobs, searchQuery, statusFilter]);

  const statusOptions: Array<'All' | JobApplication['status']> = [
    'All',
    ...getAllStatuses()
  ];

  const getStatusCount = (status: JobApplication['status'] | 'All') => {
    if (status === 'All') return jobs.length;
    return jobs.filter(job => job.status === status).length;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'All': return '📊';
      case 'Applied': return '📝';
      case 'Interviewing': return '🤝';
      case 'Offer': return '🎉';
      case 'Rejected': return '❌';
      default: return '📋';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'All': return 'from-purple-500 to-pink-500';
      case 'Applied': return 'from-purple-500 to-cyan-500';
      case 'Interviewing': return 'from-amber-500 to-orange-500';
      case 'Offer': return 'from-emerald-500 to-teal-500';
      case 'Rejected': return 'from-red-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <>
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-purple-500/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 border border-pink-500/10 rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 border border-purple-500/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 border border-pink-500/10 rotate-12 animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center relative fade-in">
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative">
            <div className="mb-8 sm:mb-12 scale-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-4 sm:mb-6 font-futuristic animate-pulse-glow">
                Job Applications
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in font-modern px-2" style={{ animationDelay: '0.3s' }}>
                Control your career journey with our <span className="gradient-text font-bold">premium</span> application tracking system.
                <br className="hidden sm:block" />
                <span className="text-sm sm:text-lg text-gray-300 block sm:inline">Stay organized, focused, and ahead of the competition.</span>
              </p>
            </div>
            
            <div className="flex justify-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <Link
                to="/add"
                className="group relative px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl neon-glow hover:neon-glow-purple transition-all duration-300 hover:scale-110 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="font-modern">Launch Your Career</span>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="mb-8 sm:mb-12 md:mb-16 animate-slide-in" style={{ animationDelay: '0.9s' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-futuristic">
            <span className="gradient-text">Application Analytics</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {statusOptions.map((status, index) => (
              <div 
                key={status} 
                className="group relative card hover-lift neon-glow hover:neon-glow-purple text-center overflow-hidden p-4 sm:p-6"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(status)} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4 text-gray-300">{getStatusIcon(status)}</div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300 font-futuristic">
                    {getStatusCount(status)}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-white font-modern">{status}</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1 font-modern hidden sm:block">
                    {status === 'All' ? 'Total Applications' : `${status} Status`}
                  </div>
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getStatusColor(status)} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 sm:mb-12 md:mb-16 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <div className="card relative overflow-hidden neon-glow p-4 sm:p-6 md:p-8">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-purple-900/30 opacity-50"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-6 sm:mb-8 text-center font-futuristic">
                Search & Filter Applications
              </h3>
              
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
                {/* Search */}
                <div className="flex-1">
                  <label htmlFor="search" className="block text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2 font-modern">
                    <span className="text-lg sm:text-xl">🔍</span>
                    <span>Search Applications</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-6 flex items-center pointer-events-none z-10">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      id="search"
                      type="text"
                      placeholder="Search by company, position, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input pl-12 sm:pl-16 text-base sm:text-lg h-12 sm:h-16 text-white neon-glow focus:neon-glow-purple relative z-20"
                      style={{ position: 'relative', zIndex: 20 }}
                    />
                    
                    {/* Search glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 opacity-0 group-focus-within:opacity-30 transition-opacity duration-500 blur-xl pointer-events-none"></div>
                  </div>
                </div>

                {/* Status Filter */}
                <div className="lg:w-80">
                  <label htmlFor="status-filter" className="block text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2 font-modern">
                    <span className="text-lg sm:text-xl">📊</span>
                    <span>Filter by Status</span>
                  </label>
                  <div className="relative group">
                    <select
                      id="status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="select text-base sm:text-lg h-12 sm:h-16 cursor-pointer font-bold text-white neon-glow focus:neon-glow-purple relative z-20"
                      style={{ position: 'relative', zIndex: 20 }}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status} className="bg-black text-white font-bold py-2">
                          {getStatusIcon(status)} {status} ({getStatusCount(status)})
                        </option>
                      ))}
                    </select>
                    
                    {/* Filter glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 opacity-0 group-focus-within:opacity-30 transition-opacity duration-500 blur-xl pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="animate-fade-in" style={{ animationDelay: '1.8s' }}>
          {filteredJobs.length === 0 ? (
            <div className="card text-center py-12 sm:py-16 md:py-20 neon-glow animate-scale-in relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20"></div>
              
              <div className="relative z-10">
                {jobs.length === 0 ? (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-gray-700/30 to-gray-600/30 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 font-futuristic">No Applications Yet</h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-modern px-2">
                        Get started by adding your first job application to begin tracking your career progress.
                      </p>
                    </div>
                    <div className="pt-6 sm:pt-8">
                      <Link to="/add" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift font-modern">
                        Add First Application
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-full flex items-center justify-center animate-pulse-glow neon-glow">
                      <span className="text-4xl sm:text-5xl md:text-6xl">🔍</span>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-3 sm:mb-4 font-futuristic">No Matches Found</h3>
                      <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-modern px-2">
                        Try adjusting your search criteria or explore different filters to discover your opportunities.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 sm:mb-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2 font-futuristic">Your Career Pipeline</h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg font-modern">
                  Showing <span className="text-purple-400 font-bold">{filteredJobs.length}</span> of{' '}
                  <span className="text-pink-400 font-bold">{jobs.length}</span> applications
                </p>
              </div>
              
              <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="animate-scale-in"
                    style={{ animationDelay: `${2 + index * 0.1}s` }}
                  >
                    <JobCard job={job} index={index} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Results Summary */}
          {filteredJobs.length > 0 && (
            <div className="mt-8 sm:mt-12 md:mt-16 text-center animate-fade-in" style={{ animationDelay: '2.5s' }}>
              <div className="glass rounded-3xl p-6 sm:p-8 inline-block neon-glow hover:neon-glow-purple transition-all duration-300 hover:scale-105">
                <p className="text-lg sm:text-xl text-white font-bold mb-2 font-modern">
                  Application Summary
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 font-medium font-modern">
                  Showing <span className="text-purple-400 font-bold">{filteredJobs.length}</span> of {jobs.length} applications
                  <br />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
