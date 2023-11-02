const apiUrl = import.meta.env.VITE_API_URL;

export async function login(email, password) {
    const res = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    localStorage.setItem('token', data.token);
}

export async function getCurrentUser() {
    const res = await fetch(`${apiUrl}/users/getUser`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message)
    }
    return data
}

export function logout(){
    localStorage.removeItem('token')
}