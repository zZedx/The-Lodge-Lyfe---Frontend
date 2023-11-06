import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const DashboardLayout = () => {
  const {bookings , isLoading : isLoadingBooking , isError : isErrorBookings} = useRecentBookings()
  const {stays, confirmedStays , isLoading : isLoadingStays , isError : isErrorStays} = useRecentStays()

  if(isLoadingBooking || isLoadingStays) return <Spinner/>


  return <StyledDashboardLayout>
    Hello
  </StyledDashboardLayout>
}

export default DashboardLayout