import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

const useBookings = () => {
  const {
    isLoading,
    data: bookings,
    isError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isLoading, bookings, isError };
};
export default useBookings;
