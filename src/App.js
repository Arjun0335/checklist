import React, { useMemo, useState } from 'react';
import TabNavigation from './TabNavigation';
import SubjectTab from './SubjectTab';
import syllabusData from './syllabusData';
import './styles.css';

export default function App() {
  const subjects = Object.keys(syllabusData);
  const [active, setActive] = useState(subjects[0]);

  // progress per subject (computed)
  const progressMap = useMemo(() => {
    const map = {};
    subjects.forEach((subj) => {
      const topics = syllabusData[subj];
      // read local storage state
      const saved = JSON.parse(localStorage.getItem(subj) || '{}');
      const total = topics.reduce((sum, t, ti) => sum + (t.subtopics?.length || 0), 0);
      const done = topics.reduce((sum, t, ti) => {
        const entry = saved[ti] || {};
        const checked = Object.values(entry).filter(Boolean).length;
        return sum + checked;
      }, 0);
      map[subj] = { done, total, pct: total ? Math.round((done/total)*100) : 0 };
    });
    return map;
  }, [active]); // recompute when tab changes (simple trigger)

  return (
    <div className="container">
      <h1>📚 Syllabus Tracker</h1>
      <p className="subtitle">Track topics and subtopics for each subject. Your progress is auto-saved in this browser.</p>

      <TabNavigation
        tabs={subjects}
        activeTab={active}
        setActiveTab={setActive}
        progressMap={progressMap}
      />

      <div className="progress-wrap">
        <div className="progress-label">
          {progressMap[active]?.done} / {progressMap[active]?.total} subtopics done ({progressMap[active]?.pct || 0}%)
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
