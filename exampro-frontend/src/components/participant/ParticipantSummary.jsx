// src/components/participant/ParticipantSummary.jsx
import React from 'react';

const ParticipantSummary = () => {
  const batches = [];
  return (
    <div className="flex items-start justify-center min-h-screen p-8 bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="flex items-center justify-center gap-2 mb-6 text-2xl font-bold text-gray-800">
          <span role="img" aria-label="package-icon">📦</span> Uploaded Participants Batches
        </h2>
        
        {batches.length === 0 ? (
          <div className="p-6 border border-gray-300 border-dashed rounded-lg bg-gray-50">
            <p className="italic text-center text-gray-500">No batches found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {batches.map(batch => (
              <div 
                key={batch.id} 
                className="flex items-center justify-between p-4 transition border rounded-lg hover:bg-gray-50"
              >
                <p className="font-semibold text-gray-700">{batch.name}</p>
                <span className={`text-sm font-medium ${batch.status === 'Completed' ? 'text-green-600' : 'text-blue-600'}`}>
                  {batch.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ParticipantSummary;