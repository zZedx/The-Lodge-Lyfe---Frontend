import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

const useBooking = () => {
  const {bookingId} = useParams()
  const {
    isLoading,
    data: booking,
    isError,
  } = useQuery({
    queryKey: ["booking" , bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { isLoading, booking, isError };
};
export default useBooking;
