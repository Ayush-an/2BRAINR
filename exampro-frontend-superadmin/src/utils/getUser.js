export default function getUser() {
  const stored = localStorage.getItem("user");
  if (!stored) return null;   // Prevent JSON.parse crash

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
