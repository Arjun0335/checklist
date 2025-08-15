import React, { useEffect, useState } from 'react';

export default function SubjectTab({ subject, topics, selectedDate }) {
  const storageKey = subject + '_' + selectedDate;
  const [checks, setChecks] = useState({});

  // load state for this date+subject
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setChecks(saved ? JSON.parse(saved) : {});
  }, [storageKey]);

  // save state for this date+subject
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checks));
  }, [storageKey, checks]);

  const toggleCheck = (topicIdx, subIdx) => {
    setChecks((prev) => ({
      ...prev,
      [topicIdx]: {
        ...prev[topicIdx],
        [subIdx]: !prev[topicIdx]?.[subIdx]
      }
    }));
  };

  return (
    <div>
      {topics.map((topic, tIdx) => (
        <div key={tIdx} className="topic">
          <h3>{topic.name}</h3>
          <ul>
            {topic.subtopics.map((sub, sIdx) => (
              <li key={sIdx}>
                <label>
                  <input
                    type="checkbox"
                    checked={!!checks[tIdx]?.[sIdx]}
                    onChange={() => toggleCheck(tIdx, sIdx)}
                  />
                  {sub}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
