import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import SubjectTab from './SubjectTab';
import syllabusData from './syllabusData';
import TaskViewer from './TaskViewer'; // New Component
import tasksData from './tasksData';
import './styles.css';

function HomePage() {
  const subjects = Object.keys(syllabusData);
  const [active, setActive] = useState(subjects[0]);

  // progress per subject (computed)
  const progressMap = useMemo(() => {
    const map = {};
    subjects.forEach((subj) => {
      const topics = syllabusData[subj];
      const saved = JSON.parse(localStorage.getItem(subj) || '{}');
      const total = topics.reduce((sum, t) => sum + (t.subtopics?.length || 0), 0);
      const done = topics.reduce((sum, t, ti) => {
        const entry = saved[ti] || {};
        const checked = Object.values(entry).filter(Boolean).length;
        return sum + checked;
      }, 0);
      map[subj] = { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
    });
    return map;
  }, [active]);

  return (
    <div className="container">
      <h1>📚 Syllabus Tracker</h1>
      <p className="subtitle">
        Track topics and subtopics for each subject. Your progress is auto-saved in this browser.
      </p>

      <Link to="/tasks" className="task-link">
        📅 View Date-Wise Tasks
      </Link>

      <TabNavigation
        tabs={subjects}
        activeTab={active}
        setActiveTab={setActive}
        progressMap={progressMap}
      />

      <div className="progress-wrap">
        <div className="progress-label">
          {progressMap[active]?.done} / {progressMap[active]?.total} subtopics done (
          {progressMap[active]?.pct || 0}%)
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressMap[active]?.pct || 0}%` }}
          />
        </div>
      </div>

      <SubjectTab subject={active} topics={syllabusData[active]} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TaskViewer />} />
      </Routes>
    </Router>
  );
}
