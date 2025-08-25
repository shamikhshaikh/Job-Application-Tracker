import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';
import { formatDate } from '../utils/helpers';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, updateJob, deleteJob } = useJobs();
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editForm, setEditForm] = useState({
    companyName: '',
    jobTitle: '',
    status: 'Applied' as 'Applied' | 'Interviewing' | 'Offer' | 'Rejected',
    applicationDate: '',
    notes: ''
  });

  const job = jobs.find(j => j.id === id);

  // Animate page on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (job) {
      setEditForm({
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        status: job.status,
        applicationDate: job.applicationDate,
        notes: job.notes || ''
      });
    }
  }, [job]);

  if (!job) {
    return (
      <>
        {/* Animated background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
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

        <div className={`relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="card text-center py-12 sm:py-16 md:py-20 neon-glow animate-scale-in">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-red-500/30 to-rose-500/30 rounded-full flex items-center justify-center mb-6 sm:mb-8">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-3 sm:mb-4 font-futuristic">Job Not Found</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 font-modern">The job application you're looking for doesn't exist.</p>
            <Link to="/" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift font-modern">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Applied': return '📝';
      case 'Interviewing': return '🤝';
      case 'Offer': return '🎉';
      case 'Rejected': return '❌';
      default: return '📋';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'from-purple-500 to-cyan-500';
      case 'Interviewing': return 'from-amber-500 to-orange-500';
      case 'Offer': return 'from-emerald-500 to-teal-500';
      case 'Rejected': return 'from-red-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (id) {
      updateJob(id, editForm);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditForm({
      companyName: job.companyName,
      jobTitle: job.jobTitle,
      status: job.status,
      applicationDate: job.applicationDate,
      notes: job.notes || ''
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job application? This action cannot be undone.')) {
      setIsDeleting(true);
      if (id) {
        await deleteJob(id);
        navigate('/');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
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

      <div className={`relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {/* Hero Header */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center relative fade-in">
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative">
            <div className="mb-6 sm:mb-8 scale-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-4 sm:mb-6 font-futuristic animate-pulse-glow">
                {isEditing ? 'Edit Application' : job.jobTitle}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in font-modern px-2" style={{ animationDelay: '0.3s' }}>
                {isEditing 
                  ? 'Update your application details and track your progress.'
                  : `Application details for ${job.companyName}`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {!isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift font-modern"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Job</span>
                </div>
              </button>
              
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn-danger text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift font-modern disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {isDeleting ? (
                    <div className="spinner w-4 h-4 sm:w-5 sm:h-5"></div>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                  <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                </div>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="btn-success text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift font-modern"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save Changes</span>
                </div>
              </button>
              
              <button
                onClick={handleCancel}
                className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift font-modern"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Cancel</span>
                </div>
              </button>
            </>
          )}
          
          <Link
            to="/"
            className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift font-modern"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </div>
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          {/* Status Card */}
          <div className="card relative overflow-hidden neon-glow hover:neon-glow-purple p-4 sm:p-6 md:p-8">
            {/* Animated background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(job.status)} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-6 sm:mb-8 text-center font-futuristic">Application Status</h3>
              
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center neon-glow animate-pulse-glow">
                  <span className="text-2xl sm:text-3xl md:text-4xl">{getStatusIcon(job.status)}</span>
                </div>
                
                <div className={`status-badge status-${job.status.toLowerCase()} neon-glow mx-auto px-3 sm:px-4 py-2 sm:py-3`}>
                  <span className="text-lg sm:text-xl md:text-2xl animate-pulse-glow mr-2 sm:mr-3">{getStatusIcon(job.status)}</span>
                  <span className="font-black text-sm sm:text-base md:text-lg font-modern">{job.status}</span>
                </div>
                
                <p className="text-sm sm:text-base text-gray-300 font-medium font-modern">
                  {job.status === 'Applied' && 'Application submitted successfully'}
                  {job.status === 'Interviewing' && 'Currently in interview process'}
                  {job.status === 'Offer' && 'Congratulations! You received an offer'}
                  {job.status === 'Rejected' && 'Application was not selected'}
                </p>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="card relative overflow-hidden neon-glow hover:neon-glow-purple p-4 sm:p-6 md:p-8">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-6 sm:mb-8 text-center font-futuristic">Application Details</h3>
              
              {isEditing ? (
                <div className="space-y-4 sm:space-y-6">
                  {/* Company Name */}
                  <div>
                    <label className="block text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-modern">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={editForm.companyName}
                      onChange={handleInputChange}
                      className="input text-base sm:text-lg h-12 sm:h-14 neon-glow focus:neon-glow-purple"
                    />
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-modern">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={editForm.jobTitle}
                      onChange={handleInputChange}
                      className="input text-base sm:text-lg h-12 sm:h-14 neon-glow focus:neon-glow-purple"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-modern">Status</label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleInputChange}
                      className="select text-base sm:text-lg h-12 sm:h-14 cursor-pointer font-bold text-white neon-glow focus:neon-glow-purple"
                    >
                      <option value="Applied" className="bg-black text-white font-bold">📝 Applied</option>
                      <option value="Interviewing" className="bg-black text-white font-bold">🤝 Interviewing</option>
                      <option value="Offer" className="bg-black text-white font-bold">🎉 Offer</option>
                      <option value="Rejected" className="bg-black text-white font-bold">❌ Rejected</option>
                    </select>
                  </div>

                  {/* Application Date */}
                  <div>
                    <label className="block text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-modern">Application Date</label>
                    <input
                      type="date"
                      name="applicationDate"
                      value={editForm.applicationDate}
                      onChange={handleInputChange}
                      className="input text-base sm:text-lg h-12 sm:h-14 neon-glow focus:neon-glow-purple"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-modern">Notes</label>
                    <textarea
                      name="notes"
                      value={editForm.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="input resize-none text-sm sm:text-base md:text-lg neon-glow focus:neon-glow-purple"
                      placeholder="Add any notes about this application..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-black/60 rounded-2xl border border-purple-500/20 p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 font-medium font-modern">Company</span>
                      </div>
                      <span className="text-sm sm:text-base md:text-lg font-bold text-white font-modern">{job.companyName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 font-medium font-modern">Position</span>
                      </div>
                      <span className="text-sm sm:text-base md:text-lg font-bold text-white font-modern">{job.jobTitle}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 font-medium font-modern">Applied Date</span>
                      </div>
                      <span className="text-sm sm:text-base md:text-lg font-bold text-white font-modern">{formatDate(job.applicationDate)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 font-medium font-modern">Last Updated</span>
                      </div>
                      <span className="text-sm sm:text-base md:text-lg font-bold text-white font-modern">{formatDate(job.updatedAt)}</span>
                    </div>
                  </div>

                  {job.notes && (
                    <div className="bg-black/60 rounded-2xl border border-purple-500/20 p-4 sm:p-6">
                      <div className="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-400 font-medium font-modern">Notes</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-modern">{job.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
