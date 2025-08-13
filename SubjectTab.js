import React, { useEffect, useMemo, useState } from 'react';

/**
 * Storage shape in localStorage[subject]:
 * {
 *   [topicIndex]: { [subIndex]: true|false, ... },
 *   ...
 * }
 */
export default function SubjectTab({ subject, topics }) {
  const storageKey = subject;
  const [checks, setChecks] = useState({});

  // load state
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setChecks(saved ? JSON.parse(saved) : {});
  }, [storageKey]);

  // save state
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checks));
  }, [storageKey, checks]);

  const toggle = (ti, si) => {
    setChecks((prev) => {
      const topicState = { ...(prev[ti] || {}) };
      topicState[si] = !topicState[si];
      return { ...prev, [ti]: topicState };
    });
  };

  const setTopicAll = (ti, value) => {
    const count = topics[ti].subtopics?.length || 0;
    setChecks((prev) => {
      const nextTopic = {};
      for (let i = 0; i < count; i++) nextTopic[i] = value;
      return { ...prev, [ti]: nextTopic };
    });
  };

  const clearAll = () => setChecks({});

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ subject, checks }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject.replace(/\s+/g,'_')}_progress.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const allCounts = useMemo(() => {
    return topics.map((t, ti) => {
      const total = t.subtopics?.length || 0;
      const done = Object.values(checks[ti] || {}).filter(Boolean).length;
      return { total, done, allDone: total > 0 && done === total };
    });
  }, [topics, checks]);

  return (
    <div className="subject-tab">
      <div className="controls">
        <button className="ghost" onClick={clearAll}>Reset subject</button>
        <button className="ghost" onClick={exportJSON}>Export progress</button>
      </div>

      {topics.map((topic, ti) => (
        <details key={ti} className="topic">
          <summary>
            <span className="topic-title">
              {topic.title}
            </span>
            <span className="topic-progress">
              {allCounts[ti]?.done}/{allCounts[ti]?.total}
            </span>
            <span className={"chip " + (allCounts[ti]?.allDone ? "chip-done" : "")}>
              {allCounts[ti]?.allDone ? "Completed" : "In progress"}
            </span>
          </summary>

          <div className="topic-actions">
            <button onClick={() => setTopicAll(ti, true)}>Mark all subtopics done</button>
            <button className="ghost" onClick={() => setTopicAll(ti, false)}>Uncheck all</button>
          </div>

          <ul className="subtopics">
            {topic.subtopics?.map((st, si) => (
              <li key={si} className="subtopic">
                <label>
                  <input
                    type="checkbox"
                    checked={!!(checks[ti]?.[si])}
                    onChange={() => toggle(ti, si)}
                  />
                  <span>{st}</span>
                </label>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
