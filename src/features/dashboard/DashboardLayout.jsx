import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import ServerError from "../../ui/ServerError";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const DashboardLayout = () => {
  const { bookings, isLoading: isLoadingBooking, isError: isErrorBookings } = useRecentBookings()
  const { stays, confirmedStays, isLoading: isLoadingStays, isError: isErrorStays, query: numDays } = useRecentStays()
  const { cabins, isLoading: isLoadingCabins } = useCabins()

  if (isLoadingBooking || isLoadingStays || isLoadingCabins) return <Spinner />
  if (isErrorBookings || isErrorStays) return <ServerError />


  return <StyledDashboardLayout>
    <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
    <DurationChart confirmedStays={confirmedStays}/>
    <SalesChart bookings={bookings} numDays={numDays}/>
  </StyledDashboardLayout>
}

export default DashboardLayout