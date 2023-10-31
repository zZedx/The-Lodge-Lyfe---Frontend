import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings";
import Spinner from '../../ui/Spinner'
import ServerError from '../../ui/ServerError'
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

import { PAGE_SIZE } from "../../utils/constants";

function BookingTable() {
  const { isLoading, bookings = [], isError } = useBookings()
  const [searchParams] = useSearchParams()
  const sortBy = searchParams.get('sortBy') || 'startDate-desc'
  const [field, value] = sortBy.split("-")

  const page = searchParams.get('page') || 1

  const slicedBookings = bookings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  switch (field) {
    case "startDate":
      bookings.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      break;
    case "totalPrice":
      bookings.sort((a, b) => a.totalPrice - b.totalPrice)
      break;
    default:
      break;
  }
  value === "asc" ? bookings : bookings.reverse()


  if (isLoading) return <Spinner />
  if (isError) return <ServerError />

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={slicedBookings}
          render={(booking) => (
            <BookingRow key={booking._id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={bookings.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
