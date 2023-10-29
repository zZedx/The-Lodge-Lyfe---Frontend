const apiUrl = import.meta.env.VITE_API_URL;

export async function getBookings(){
    const res = await fetch(apiUrl + "/bookings")
    const data = res.json()
    if(!res.ok){
        throw new Error("Error Fetching Data")
    }
    return data
}