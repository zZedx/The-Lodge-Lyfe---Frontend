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
    if(!res.ok){
        throw new Error(data.message)
    }
}