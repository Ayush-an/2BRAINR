// src/utils/constants.js

export const ROLES = {
  SUPER_ADMIN: "SuperAdmin",
  ADMIN: "Admin",
  SUPER_USER: "SuperUser",
  PARTICIPANT: "Participant",
};

export const USER_STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  INACTIVE: "Inactive",
};

export const EXAM_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  SCHEDULED: "Scheduled",
  COMPLETED: "Completed",
  REMOVED: "Removed",
};

export const GROUP_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  CLOSED: "Closed",
};

export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];

export const ACTIVITY_TYPES = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  APPROVE: "APPROVE",
};

export const DEFAULT_TIMEZONE = "Asia/Kolkata";
