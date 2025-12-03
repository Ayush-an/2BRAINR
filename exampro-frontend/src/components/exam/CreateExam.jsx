// src/components/exam/CreateExam.jsx
import { useState } from "react";

export default function CreateExam({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("Active");
  const [scheduleExam, setScheduleExam] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, duration, status, scheduleExam });
    onClose();
  };

  return (
    <div className="space-y-3">
      <h2 className="mb-4 text-lg font-bold text-center">Create Exam</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Title" className="w-full px-3 py-2 border rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" className="w-full px-3 py-2 border rounded-md" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Duration (minutes)" className="w-full px-3 py-2 border rounded-md" value={duration} onChange={(e) => setDuration(e.target.value)} required />
          <select className="w-full px-3 py-2 border rounded-md" value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" checked={scheduleExam} onChange={(e) => setScheduleExam(e.target.checked)} />
          <label>Schedule this exam</label>
        </div>

        <div className="flex justify-end gap-2 mt-3">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md">Create</button>
        </div>
      </form>
    </div>
  );
}
