// src/components/exam/ManageExam.jsx
import React, { useState } from 'react';

const RemovedExam = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [examCode, setExamCode] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [adminFilter, setAdminFilter] = useState('');
  const [dateRange, setDateRange] = useState(''); // This would typically be a date picker component's state
  const [tableSearch, setTableSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  // Dummy data (empty as per image)
  const removedExams = []; // In a real app, this would be fetched from an API

  const handleApplyFilters = () => {
    console.log("Applying filters:", { searchTerm, examCode, statusFilter, adminFilter, dateRange });
    // Logic to filter removed exams
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setExamCode('');
    setStatusFilter('');
    setAdminFilter('');
    setDateRange('');
    console.log("Filters cleared.");
    // Logic to reset removed exam list
  };

  // Pagination logic (simplified)
  const totalPages = Math.ceil(removedExams.length / rowsPerPage);
  const currentExams = removedExams.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Removed Exam</h2>

      {/* Filter and Search Bar (reused from ManageExam) */}
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

      {/* Table Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/3"
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
          />
          <button className="px-4 py-2 font-bold text-white transition duration-150 ease-in-out bg-green-500 rounded hover:bg-green-600">
            Export to Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Sr.</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Title</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Exam Code</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Description</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Duration</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Created At</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Removed At</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Created By</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Removed By</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentExams.length > 0 ? (
                currentExams.map((exam, index) => (
                  <tr key={exam.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{currentPage * rowsPerPage + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.examCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.createdAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.removedAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.createdBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{exam.removedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Action buttons, e.g., Restore */}
                      <button className="text-blue-600 hover:text-blue-900">Restore</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="px-6 py-4 text-center text-gray-500 whitespace-nowrap">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <select
              className="block px-3 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(0); // Reset to first page when rows per page changes
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">
              {currentPage + 1} / {totalPages === 0 ? 1 : totalPages}
            </span>
            <button
              className="p-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              className="p-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1 || totalPages === 0}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemovedExam;