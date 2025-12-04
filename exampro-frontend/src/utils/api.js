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

// Update a group by ID
export const updateGroup = async (groupId, data) => {
  const token = localStorage.getItem("token");
  const payload = {
    ...data,
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
  };

  const res = await fetch(`${API_URL}/api/group/${groupId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  return res.json();
};

// Delete a group by ID
export const deleteGroup = async (groupId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/group/${groupId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
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
// Fetch removed/deleted groups
export const fetchRemovedGroups = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/group/removed`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Create participant
export const createParticipant = async (data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/participant/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Fetch participants of organization
export const fetchParticipants = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/participant`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};