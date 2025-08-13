import React from 'react';

export default function TabNavigation({ tabs, activeTab, setActiveTab, progressMap }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? 'active' : ''}
          onClick={() => setActiveTab(tab)}
          title={`${progressMap[tab]?.pct || 0}% complete`}
        >
          <div className="tab-title">{tab}</div>
          <div className="tab-sub">{progressMap[tab]?.pct || 0}%</div>
        </button>
      ))}
    </div>
  );
}
