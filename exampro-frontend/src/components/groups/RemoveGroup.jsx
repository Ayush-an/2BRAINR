import React, { useState, useEffect } from 'react';
import { fetchRemovedGroups } from '../../utils/api';

const RemoveGroup = () => {
  const [removedGroups, setRemovedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRemovedGroups = async () => {
      try {
        const data = await fetchRemovedGroups();
        setRemovedGroups(data);
      } catch (err) {
        console.error("Failed to fetch removed groups:", err);
      } finally {
        setLoading(false);
      }
    };
    loadRemovedGroups();
  }, []);
  if (loading) return <div className="p-6 text-center">Loading removed groups...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-center">Removed Groups</h2>

      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-orange-200 border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Start Date</th>
            <th className="p-3 text-left">End Date</th>
            <th className="p-3 text-left">Created By</th>
            <th className="p-3 text-left">Deleted By</th>
            <th className="p-3 text-left">Deleted At</th>
          </tr>
        </thead>
        <tbody>
          {removedGroups.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-4 italic text-center text-gray-500">
                No removed groups found.
              </td>
            </tr>
          ) : (
            removedGroups.map((g) => (
              <tr key={g.id} className="border-b">
                <td className="p-3">{g.name}</td>
                <td className="p-3">{g.description}</td>
                <td className="p-3">{g.start}</td>
                <td className="p-3">{g.end}</td>
                <td className="p-3">{g.createdBy}</td>
                <td className="p-3">{g.deletedBy}</td>
                <td className="p-3">{g.deletedAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default RemoveGroup;