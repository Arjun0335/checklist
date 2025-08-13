# 📚 Syllabus Tracker (React)

A clean, modern checklist app to track syllabus progress per subject, with nested **topics → subtopics**, auto-save in `localStorage`, per-subject progress bar, and export of progress to JSON.

## Quick Start
```bash
npx create-react-app my-syllabus-tracker
cd my-syllabus-tracker
# replace the generated files with the ones in this package (public/ and src/)
npm start
```

## Features
- 🗂️ Tabs per subject
- ✅ Checkboxes for each subtopic (auto-saved)
- 📊 Progress bar and per-topic counters
- ↪️ Reset subject, ✅ Mark-all / Uncheck-all per topic
- ⬇️ Export progress to JSON

## Structure
```
public/index.html
src/index.js
src/App.js
src/TabNavigation.js
src/SubjectTab.js
src/syllabusData.js
src/styles.css
```
