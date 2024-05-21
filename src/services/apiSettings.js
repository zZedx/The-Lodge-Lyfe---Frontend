import { throwError } from "../utils/throwError";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getSettings() {
  const res = await fetch(apiUrl + "/settings");
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error fetching Settings");
  }
  return data;
}

export async function updateSettings(setting) {
  const res = await fetch(apiUrl + "/settings/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ setting }),
    credentials: "include",
  });
  if (!res.ok) {
    await throwError(res);
  }
}
