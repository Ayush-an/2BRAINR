//src/components/groups/GroupSummary.jsx
import React, { useState, useEffect } from 'react';
import { fetchUploadedBatches } from '../../utils/api';

const GroupSummary = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const data = await fetchUploadedBatches();
        setBatches(data);
      } catch (err) {
        console.error("Failed to fetch batches:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBatches();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading batches...</div>;

  return (
    <div className="flex items-start justify-center min-h-screen p-8 bg-gray-100">
      <div className="w-full max-w-2xl p-6 text-center bg-white rounded-lg shadow-md">
        <h2 className="flex items-center justify-center gap-2 mb-4 text-2xl font-bold text-gray-800">
          <span role="img" aria-label="package-icon">📦</span> Uploaded Added Group Participant Batches
        </h2>
        {batches.length === 0 ? (
          <p className="p-4 italic text-gray-500">No batches found.</p>
        ) : (
          <div>
            {batches.map(batch => (
              <div key={batch.id} className="py-2 border-b last:border-b-0">
                <p>{batch.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupSummary;
