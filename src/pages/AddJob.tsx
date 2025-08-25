import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';
import { JobFormData } from '../types';

const AddJob: React.FC = () => {
  const navigate = useNavigate();
  const { addJob } = useJobs();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    companyName: '',
    jobTitle: '',
    status: 'Applied',
    applicationDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Animate page on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob(formData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse-glow"
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
        <div className="absolute top-1/4 left-10 w-40 h-40 border border-purple-500/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 border border-pink-500/10 rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-purple-500/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-36 h-36 border border-pink-500/10 rotate-12 animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className={`relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {/* Hero Header */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center relative fade-in">
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative">
            <div className="mb-6 sm:mb-8 scale-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-4 sm:mb-6 font-futuristic animate-pulse-glow">
                Add New Application
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in font-modern px-2" style={{ animationDelay: '0.3s' }}>
                Track your <span className="gradient-text font-bold">next career opportunity</span> with us.
                <br className="hidden sm:block" />
                <span className="text-sm sm:text-base md:text-lg text-gray-300 block sm:inline">Stay organized and never miss a follow-up.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="card relative overflow-hidden neon-glow animate-scale-in p-4 sm:p-6 md:p-8" style={{ animationDelay: '0.6s' }}>
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-2000 ease-out"></div>
          
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Form Header */}
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4 flex items-center justify-center space-x-2 sm:space-x-3 font-futuristic">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center neon-glow">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span>Application Details</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-400 font-medium font-modern">Fill in the details below to track your new job application</p>
              </div>

              {/* Company Name */}
              <div className="space-y-3 sm:space-y-4">
                <label htmlFor="companyName" className="block text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2 sm:space-x-3 font-modern">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span>Company Name</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name..."
                  required
                  className="input text-base sm:text-lg md:text-xl h-12 sm:h-14 md:h-16 neon-glow focus:neon-glow-purple"
                />
              </div>

              {/* Job Title */}
              <div className="space-y-3 sm:space-y-4">
                <label htmlFor="jobTitle" className="block text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2 sm:space-x-3 font-modern">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <span>Job Title</span>
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Enter job title..."
                  required
                  className="input text-base sm:text-lg md:text-xl h-12 sm:h-14 md:h-16 neon-glow focus:neon-glow-purple"
                />
              </div>

              {/* Status */}
              <div className="space-y-3 sm:space-y-4">
                <label htmlFor="status" className="block text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2 sm:space-x-3 font-modern">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Application Status</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="select text-base sm:text-lg md:text-xl h-12 sm:h-14 md:h-16 cursor-pointer font-bold text-white neon-glow focus:neon-glow-purple"
                >
                  <option value="Applied" className="bg-black text-white font-bold">📝 Applied</option>
                  <option value="Interviewing" className="bg-black text-white font-bold">🤝 Interviewing</option>
                  <option value="Offer" className="bg-black text-white font-bold">🎉 Offer</option>
                  <option value="Rejected" className="bg-black text-white font-bold">❌ Rejected</option>
                </select>
              </div>

              {/* Application Date */}
              <div className="space-y-3 sm:space-y-4">
                <label htmlFor="applicationDate" className="block text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2 sm:space-x-3 font-modern">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>Application Date</span>
                </label>
                <input
                  type="date"
                  id="applicationDate"
                  name="applicationDate"
                  value={formData.applicationDate}
                  onChange={handleInputChange}
                  required
                  className="input text-base sm:text-lg md:text-xl h-12 sm:h-14 md:h-16 neon-glow focus:neon-glow-purple"
                />
              </div>

              {/* Notes */}
              <div className="space-y-3 sm:space-y-4">
                <label htmlFor="notes" className="block text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center space-x-2 sm:space-x-3 font-modern">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <span>Notes (Optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any notes about this application..."
                  rows={4}
                  className="input resize-none text-sm sm:text-base md:text-lg neon-glow focus:neon-glow-purple"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift font-modern flex-1"
                >
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Go Back</span>
                  </div>
                </button>
                
                <button
                  type="submit"
                  className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift font-modern flex-1"
                >
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Add Application</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddJob;
