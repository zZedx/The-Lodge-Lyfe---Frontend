import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status") || "all";

  const {
    isLoading,
    data: bookings,
    isError,
  } = useQuery({
    queryKey: ["bookings" , filterValue],
    queryFn: () => getBookings(filterValue),
  });

  return { isLoading, bookings, isError };
};
export default useBookings;
