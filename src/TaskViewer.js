// src/components/TaskViewer.js
import React, { useState } from "react";
import tasksByDate from "../tasksData";

export default function TaskViewer() {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Task Viewer</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ padding: "5px", marginBottom: "15px" }}
      />

      {selectedDate && tasksByDate[selectedDate] ? (
        <ul>
          {tasksByDate[selectedDate].map((task) => (
            <li key={task.id}>{task.task}</li>
          ))}
        </ul>
      ) : selectedDate ? (
        <p>No tasks found for this date.</p>
      ) : (
        <p>Select a date to view tasks.</p>
      )}
    </div>
  );
}
