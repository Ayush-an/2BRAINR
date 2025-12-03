import React, { useState, useEffect } from 'react';
import { fetchRemovedGroups } from '../../utils/api';

const RemoveGroup = () => {
  const [removedGroups, setRemovedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState('');
  const [adminFilter, setAdminFilter] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

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

  const totalPages = Math.ceil(removedGroups.length / rowsPerPage);
  const currentGroups = removedGroups.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  if (loading) return <div className="p-6 text-center">Loading removed groups...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* ...rest of your JSX (filters, table, pagination) */}
    </div>
  );
};

export default RemoveGroup;
