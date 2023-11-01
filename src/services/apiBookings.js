const apiUrl = import.meta.env.VITE_API_URL;

export async function getBookings(filterValue){
    const res = await fetch(apiUrl + "/bookings?status=" + filterValue)
    const data = res.json()
    if(!res.ok){
        throw new Error("Error Fetching Data")
    }
    return data
}

export async function getBooking(bookingId){
    const res = await fetch(apiUrl + "/bookings/" + bookingId)
    const data = res.json()
    if(!res.ok){
        throw new Error("Error Fetching Data")
    }
    return data
}