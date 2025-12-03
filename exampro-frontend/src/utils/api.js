// src/utils/api.js
const API_URL = import.meta.env.VITE_API_URL;

// Fetch all groups
export const fetchGroups = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/group`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Fetch removed groups
export const fetchRemovedGroups = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/group/removed`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Fetch uploaded batches
export const fetchUploadedBatches = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/group/batches`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Create a new group
export const createGroup = async (group) => {
  const token = localStorage.getItem("token");
  const payload = {
    ...group,
    startDate: group.startDate ? new Date(group.startDate) : null,
    endDate: group.endDate ? new Date(group.endDate) : null,
    createdBy: parseInt(group.createdBy),
  };

  const res = await fetch(`${API_URL}/api/group`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
