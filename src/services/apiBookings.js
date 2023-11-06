import { throwError } from "../utils/throwError";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getBookings(filterValue){
    const res = await fetch(apiUrl + "/bookings?status=" + filterValue)
    const data = res.json()
    if(!res.ok){
        throw new Error("Error Fetching Data")
    }
    return data
}

export async function getBooking(id){
    const res = await fetch(apiUrl + "/bookings/" + id)
    const data = res.json()
    if(!res.ok){
        throw new Error("Error Fetching Data")
    }
    return data
}

export async function updateBooking(id , options){
    const res = await fetch(apiUrl + "/bookings/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials : 'include',
        body: JSON.stringify(options)
    })
    if(!res.ok){
        await throwError(res)
    }
}

export async function deleteBooking(id){
    const res = await fetch(apiUrl + "/bookings/" + id, {
        method: "DELETE",
        credentials : 'include'
    })
    if(!res.ok){
        await throwError(res)
    }
}

export async function getBookingsAfterDate(date){
    const res = await fetch(apiUrl + "/bookings/bookingsAfterDate?date=" + date)
    const data = res.json()
    if(!res.ok){
        await throwError(res)
    }
    return data
}

export async function getStaysAfterDate(date){
    const res = await fetch(apiUrl + "/bookings/staysAfterDate?date=" + date)
    const data = res.json()
    if(!res.ok){
        await throwError(res)
    }
    return data
}