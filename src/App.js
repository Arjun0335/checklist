import React, { useMemo, useState } from 'react';
import TabNavigation from './TabNavigation';
import SubjectTab from './SubjectTab';
import syllabusData from './syllabusData';
import './styles.css';

export default function App() {
  const subjects = Object.keys(syllabusData);
  const [active, setActive] = useState(subjects[0]);

  // Set default date to 18th of current month
  const today = new Date();
  const defaultDate = new Date(today.getFullYear(), today.getMonth(), 18);
  const nextMonth18 = new Date(today.getFullYear(), today.getMonth() + 1, 18);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(formatDate(defaultDate));

  // progress per subject (computed)
  const progressMap = useMemo(() => {
    const map = {};
    subjects.forEach((subj) => {
      const topics = syllabusData[subj];
      const totalSubtopics = topics.reduce((sum, topic) => sum + topic.subtopics.length, 0);
      // For progress, get checks from localStorage for this date
      const storageKey = subj + '_' + selectedDate;
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      const checkedCount = Object.values(saved).reduce(
        (sum, subCheck) => sum + Object.values(subCheck).filter(Boolean).length,
        0
      );
      map[subj] = totalSubtopics === 0 ? 0 : (checkedCount / totalSubtopics) * 100;
    });
    return map;
  }, [subjects, selectedDate]);

  return (
    <div>
      <h1>My Syllabus Tracker</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          min={formatDate(defaultDate)}
          max={formatDate(nextMonth18)}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <TabNavigation active={active} setActive={setActive} progressMap={progressMap} />
      <SubjectTab subject={active} topics={syllabusData[active]} selectedDate={selectedDate} />
    </div>
  );
}
