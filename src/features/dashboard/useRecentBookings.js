import { useQuery } from "@tanstack/react-query"
import { getBookingsAfterDate } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { subDays } from "date-fns"

const useRecentBookings = () => {
    const [searchParams] = useSearchParams()
    const query = Number(searchParams.get("last")) || 7
    const date = subDays(new Date(), query).toISOString();
    const { data: bookings, isLoading, isError } = useQuery({
        queryKey: ["bookings" , query],
        queryFn: () => getBookingsAfterDate(date),
    })
    return { bookings, isLoading, isError }
}

export default useRecentBookings