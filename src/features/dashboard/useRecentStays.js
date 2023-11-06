import { useQuery } from "@tanstack/react-query"
import { getStaysAfterDate } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { subDays } from "date-fns"

const useRecentBookings = () => {
    const [searchParams] = useSearchParams()
    const query = Number(searchParams.get("last")) || 7
    const date = subDays(new Date(), query).toISOString();
    const { data: stays, isLoading, isError } = useQuery({
        queryKey: ["stays" , query],
        queryFn: () => getStaysAfterDate(date),
    })

    const confirmedStays = stays?.filter(stay => stay.status === "checked-in" || stay.status === "checked-out")
    return { stays, confirmedStays,  isLoading, isError }
}

export default useRecentBookings