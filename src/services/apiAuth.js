import { throwError } from "../utils/throwError";

const apiUrl = import.meta.env.VITE_API_URL;

export async function checkStatus() {
  const res = await fetch(`${apiUrl}/status`);
  if (!res.ok) {
    await throwError(res);
  }
}

export async function login(email, password) {
  const res = await fetch(`${apiUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.toLowerCase(), password }),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
}

export async function register(email, password, name) {
  const res = await fetch(`${apiUrl}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.toLowerCase(), password, name }),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
}

export async function getCurrentUser() {
  const res = await fetch(`${apiUrl}/users/getUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function getAllUsers(query) {
  const res = await fetch(`${apiUrl}/users/allUsers?users=${query}`);
  const data = await res.json();
  if (!res.ok) {
    await throwError(res);
  }
  return data;
}

export async function deleteUser(id) {
  const res = await fetch(`${apiUrl}/users/deleteUser/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    await throwError(res);
  }
}

export async function updateRole(id, isAdmin) {
  const res = await fetch(`${apiUrl}/users/updateRole/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ isAdmin }),
  });
  if (!res.ok) {
    await throwError(res);
  }
}

export async function updateCurrentUser(user) {
  const hasImagePath = user.profilePic?.startsWith?.(
    "https://res.cloudinary.com"
  );
  const newUser = new FormData();
  newUser.append(
    "profilePic",
    hasImagePath ? user.profilePic : user.profilePic[0]
  );
  newUser.append("name", user.name);
  newUser.append("oldPassword", user.oldPassword);
  newUser.append("password", user.password);
  newUser.append("imageName", user.imageName);

  const res = await fetch(apiUrl + "/users/updateUser", {
    method: "PATCH",
    body: newUser,
    credentials: "include",
  });
  if (!res.ok) {
    await throwError(res);
  }
  const data = await res.json();
  return data;
}

export async function logout() {
  const res = await fetch(`${apiUrl}/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    await throwError(res);
  }
}
