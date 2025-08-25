import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobProvider } from './contexts/JobContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import JobDetails from './pages/JobDetails';

const App: React.FC = () => {
  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen bg-black overflow-x-hidden">
          <Header />
          <main className="relative">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddJob />} />
              <Route path="/job/:id" element={<JobDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </JobProvider>
  );
};

export default App;
