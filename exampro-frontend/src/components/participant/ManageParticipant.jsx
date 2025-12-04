// src/components/participant/ManageParticipant.jsx
import React, { useState } from 'react';
const ManageParticipant = () => {
  const [activeTab, setActiveTab] = useState('myParticipants');
  const [batchFilter, setBatchFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const participants = [
    {
      id: 1,
      name: 'Mohd Sameer',
      email: 'mohdsameer789736@gmail.com',
      mobile: '6394867435',
      password: '123456789',
      approved: true,
      createdAt: '10/10/2025 03:18 PM',
      batchId: 'Batch-XYZ',
    },
  ];

  const handleSearch = () => {
    console.log("Searching participants:", { activeTab, batchFilter, searchQuery });
  };

  const handleExportToExcel = () => {
    console.log("Exporting participants to Excel...");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Manage Participants</h2>
      <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
        {/* Tabs and Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('myParticipants')}
              className={`py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                activeTab === 'myParticipants'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              My Participants
            </button>
            <button
              onClick={() => setActiveTab('allParticipants')}
              className={`py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                activeTab === 'allParticipants'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              All Participants
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-end flex-grow gap-4">
            {/* Batch Filter Dropdown */}
            <div className="relative">
              <select
                className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
              >
                <option value="">All Batches</option>
                {/* Add batch options here */}
                <option value="Batch-A">Batch A</option> <option value="Batch-B">Batch B</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <input type="text" placeholder="Search participants by name, em..."
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 max-w-[250px] min-w-[180px]"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  />
            <button onClick={handleSearch}
              className="w-auto px-4 py-2 font-bold text-white transition duration-150 ease-in-out bg-blue-600 rounded hover:bg-blue-700"
            >
              Search
            </button>
            <button onClick={handleExportToExcel}
              className="w-auto px-4 py-2 font-bold text-white transition duration-150 ease-in-out bg-green-500 rounded hover:bg-green-600"
            >
              Export to Excel
            </button>
          </div>
        </div>

        {/* Participants Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Mobile</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Password</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Approved</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Created At</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">BatchId</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {participants.length > 0 ? (
                participants.map((participant) => (
                  <tr key={participant.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{participant.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{participant.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{participant.mobile}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{participant.password}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {participant.approved ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-red-600">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{participant.createdAt}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{participant.batchId}</td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <a href="#" className="mr-4 text-blue-600 hover:text-blue-900">Edit</a>
                      <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500 whitespace-nowrap">
                    No participants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ManageParticipant;