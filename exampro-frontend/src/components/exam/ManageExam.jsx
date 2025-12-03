// src/components/exam/ManageExam.jsx
import React, { useState } from 'react';

const ManageExam = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [examCode, setExamCode] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [adminFilter, setAdminFilter] = useState('');
  const [dateRange, setDateRange] = useState(''); // This would typically be a date picker component's state

  // Dummy data for demonstration
  const exams = [
    {
      id: 'EX-440867',
      title: 'sample exam',
      description: 'this is a test exam',
      duration: '15 min',
      status: 'Active',
    },
  ];

  const handleApplyFilters = () => {
    console.log("Applying filters:", { searchTerm, examCode, statusFilter, adminFilter, dateRange });
    // Logic to filter exams based on state
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setExamCode('');
    setStatusFilter('');
    setAdminFilter('');
    setDateRange('');
    console.log("Filters cleared.");
    // Logic to reset exam list
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Manage Exams</h2>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-4 p-6 mb-6 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search exams..."
          className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Exam Code..."
          className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={examCode}
          onChange={(e) => setExamCode(e.target.value)}
        />

        {/* Filter by Status Dropdown */}
        <div className="relative flex-1 min-w-[150px]">
          <select
            className="block w-full px-3 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filter by status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Filter by Admin Dropdown */}
        <div className="relative flex-1 min-w-[150px]">
          <select
            className="block w-full px-3 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={adminFilter}
            onChange={(e) => setAdminFilter(e.target.value)}
          >
            <option value="">Filter by Admin</option>
            {/* Add admin options here */}
            <option value="Admin1">Admin 1</option>
            <option value="Admin2">Admin 2</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="relative flex items-center flex-1 min-w-[150px] border border-gray-300 rounded-md">
          <span className="absolute text-gray-500 left-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </span>
          <input
            type="text" // Or a date picker component
            placeholder="Pick a date range"
            className="w-full py-2 pr-2 bg-transparent pl-9 focus:outline-none"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
        </div>

        <button
          onClick={handleApplyFilters}
          className="w-auto px-4 py-2 font-bold text-white transition duration-150 ease-in-out bg-blue-600 rounded hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          onClick={handleClearFilters}
          className="w-auto px-4 py-2 font-bold text-gray-800 transition duration-150 ease-in-out bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {/* Exam List */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        {exams.map((exam) => (
          <div key={exam.id} className="flex flex-wrap items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
            <div className="flex-1 min-w-[200px] mb-2 md:mb-0">
              <a href="#" className="text-lg font-semibold text-blue-600 hover:underline">{exam.title}</a>
              <p className="text-gray-600">{exam.description}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <span className="mr-4">{exam.id}</span>
                <span className="mr-4">{exam.duration}</span>
                <span className="font-medium text-green-600">{exam.status}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 font-bold text-white transition duration-150 ease-in-out bg-red-500 rounded hover:bg-red-600">
                Delete
              </button>
              <button className="px-4 py-2 font-bold text-white transition duration-150 ease-in-out bg-blue-500 rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="px-4 py-2 font-bold text-white transition duration-150 ease-in-out bg-green-500 rounded hover:bg-green-600">
                Add Question
              </button>
            </div>
          </div>
        ))}
        {exams.length === 0 && (
          <p className="py-4 text-center text-gray-500">No exams found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageExam;