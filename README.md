# Job Tracker 
Job Tracker is a modern web application built with React and TypeScript that helps you keep track of your job applications in one place. You can quickly add roles, update their progress through statuses (Applied, Interviewing, Offer, Rejected), attach personal notes, and easily filter or search through your pipeline. All data is stored locally in the browser via localStorage, so no external server or database is required. It proves to be a one-stop app for application tracking. 

# Features
- Local Tracker – all your applications are stored securely in your browser’s localStorage; no signup or servers.
- Full CRUD workflow – create, view, update, and delete job applications with intuitive forms and controls.
- Custom statuses with visual cues – track stages like Applied, Interviewing, Offer, and Rejected with distinctive colors and icons for instant recognition.
- Powerful search & filtering – search by company, job title, or notes, and filter by status to focus only on what matters.
- Smart sorting – applications are automatically sorted by the most recent activity to keep your dashboard relevant.
- Notes & context – attach notes to each application (e.g., recruiter details, interview prep, deadlines).
- One-click import/export – back up or migrate your entire application list as JSON in seconds.
- Responsive UI – Tailwind‑styled components with modern typography, neon highlights, and smooth animations.

# File Structure 
job_tracker/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   │   ├── AddJob.tsx
│   │   ├── Dashboard.tsx
│   │   └── JobDetails.tsx
│   ├── types/
│   ├── utils/
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
└── .gitignore

# Tech Stack
- React + TypeScript
- React Router for routing
- Context + useReducer for state management
- Tailwind CSS for styling (with custom theme, fonts, neon shadows)
- Create React App (react-scripts) build toolchain
  
# Get Started 
```bash
# Clone the repository
git clone https://github.com/<shamikhshaikh>/<Job-Application-Tracker>.git
# Navigate into the project
cd job_tracker
# Install dependencies
npm install
# Run locally
npm start


