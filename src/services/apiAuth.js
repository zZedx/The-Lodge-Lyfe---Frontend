import Cookies from 'universal-cookie'
import { throwError } from '../utils/throwError';
const cookies = new Cookies()
const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000 * 7) // 7 days from now

const apiUrl = import.meta.env.VITE_API_URL;

export function getToken() {
    return cookies.get('token')
}

export async function checkStatus() {
    const res = await fetch(`${apiUrl}/status`)
    if (!res.ok) {
        await throwError(res)
    }
}

export async function login(email, password) {
    const res = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email : email.toLowerCase(), password })
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    cookies.set('token', data.token, { path: '/' , expires: expirationDate});
    // localStorage.setItem('token', data.token);
}

export async function register(email, password , name) {
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000 * 7) // 7 days from now
    const res = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email : email.toLowerCase(), password , name})
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    cookies.set('token', data.token, { path: '/' , expires: expirationDate});
}

export async function getCurrentUser() {
    const token = getToken()
    const res = await fetch(`${apiUrl}/users/getUser`, {
        method: 'GET',
        // credentials: 'include',
        headers: {'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${token}`}
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    return data
}

export async function getAllUsers(query) {
    const res = await fetch(`${apiUrl}/users/allUsers?users=${query}`)
    const data = await res.json()
    if (!res.ok) {
        await throwError(res)
    }
    return data
}

export async function deleteUser(id) {
    const token = getToken()
    const res = await fetch(`${apiUrl}/users/deleteUser/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${token}`}
    })
    if (!res.ok) {
        await throwError(res)
    }
}

export async function updateRole(id , isAdmin) {
    const token = getToken()
    const res = await fetch(`${apiUrl}/users/updateRole/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${token}`},
        body: JSON.stringify({isAdmin})
    })
    if (!res.ok) {
        await throwError(res)
    }
}

export async function updateCurrentUser(user) {
    const token = getToken()
    const hasImagePath = user.profilePic?.startsWith?.("https://res.cloudinary.com");
    const newUser = new FormData();
    newUser.append("profilePic", hasImagePath ? user.profilePic : user.profilePic[0]);
    newUser.append("name", user.name);
    newUser.append("oldPassword", user.oldPassword);
    newUser.append("password", user.password);
    newUser.append("imageName", user.imageName);
  
    const res = await fetch(apiUrl + "/users/updateUser", {
      method: "PATCH",
      body: newUser,
      headers: {'Authorization': `Bearer ${token}`},
    });
    if (!res.ok) {
      await throwError(res);
    }
    const data = await res.json();
    return data;
  }

export function logout() {
    cookies.remove('token')
}