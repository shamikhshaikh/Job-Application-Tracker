import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';

const Header: React.FC = () => {
  const { exportJobs, importJobs } = useJobs();
  const [isImporting, setIsImporting] = useState(false);
  const [importMessage, setImportMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Animate header on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportMessage('Importing jobs...');

    try {
      await importJobs(file);
      setImportMessage('Jobs imported successfully!');
      setTimeout(() => setImportMessage(''), 3000);
    } catch (error) {
      setImportMessage('Error importing jobs. Please check file format.');
      setTimeout(() => setImportMessage(''), 3000);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse-glow" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-pink-400 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-16 right-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
      </div>

      <header className={`glass border-b border-purple-500/20 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-0 sm:h-20 space-y-4 sm:space-y-0">
            {/* Logo and Title */}
            <div className="flex items-center justify-center sm:justify-start group">
              <Link to="/" className="flex items-center space-x-2 sm:space-x-4 hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg neon-glow group-hover:neon-glow-purple transition-all duration-300">
                    <span className="text-white font-bold text-lg sm:text-xl font-futuristic">J</span>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl sm:text-2xl font-bold gradient-text font-futuristic">Job Tracker</h1>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium font-modern hidden sm:block">Professional Application Manager</p>
                </div>
              </Link>
            </div>

            {/* Navigation - Hidden on mobile, shown in separate section */}
            <nav className="hidden md:flex space-x-2">
              <Link
                to="/"
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 group overflow-hidden font-modern ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/50 neon-glow' 
                    : 'text-gray-300 hover:text-white hover:bg-black/20 border border-transparent hover:border-purple-500/30'
                }`}
              >
                <span className="relative z-10">Dashboard</span>
                {isActive('/') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-sm"></div>
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-white/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/add"
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 group overflow-hidden font-modern ${
                  isActive('/add') 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/50 neon-glow' 
                    : 'text-gray-300 hover:text-white hover:bg-black/20 border border-transparent hover:border-purple-500/30'
                }`}
              >
                <span className="relative z-10">Add Job</span>
                {isActive('/add') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-sm"></div>
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-white/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center justify-center sm:justify-end space-x-2 sm:space-x-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
                className="btn-secondary text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed font-modern px-3 sm:px-4 py-2 sm:py-3"
              >
                {isImporting ? (
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="spinner w-3 h-3 sm:w-4 sm:h-4"></div>
                    <span className="hidden sm:inline">Importing...</span>
                    <span className="sm:hidden">...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <span className="hidden sm:inline">Import</span>
                    <span className="sm:hidden">Imp</span>
                  </div>
                )}
              </button>
              
              <button
                onClick={exportJobs}
                className="btn-primary text-xs sm:text-sm font-modern px-3 sm:px-4 py-2 sm:py-3"
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="hidden sm:inline">Export</span>
                  <span className="sm:hidden">Exp</span>
                </div>
              </button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden pb-4">
            <div className="flex space-x-2">
              <Link
                to="/"
                className={`flex-1 px-3 py-3 rounded-xl text-center font-semibold transition-all duration-300 font-modern text-sm ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/50 neon-glow' 
                    : 'text-gray-300 hover:text-white hover:bg-black/20 border border-transparent hover:border-purple-500/30'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/add"
                className={`flex-1 px-3 py-3 rounded-xl text-center font-semibold transition-all duration-300 font-modern text-sm ${
                  isActive('/add') 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/50 neon-glow' 
                    : 'text-gray-300 hover:text-white hover:bg-black/20 border border-transparent hover:border-purple-500/30'
                }`}
              >
                Add Job
              </Link>
            </div>
          </div>
        </div>

        {/* Import Message */}
        {importMessage && (
          <div className={`max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 scale-in ${
            importMessage.includes('Error') ? 'text-red-400' : 'text-emerald-400'
          }`}>
            <div className="glass rounded-xl p-3 sm:p-4 text-center neon-glow">
              <p className="text-xs sm:text-sm font-medium font-modern">{importMessage}</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
