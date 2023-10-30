import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings";
import Spinner from '../../ui/Spinner'
import ServerError from '../../ui/ServerError'

function BookingTable() {
  const { isLoading, bookings = [], isError } = useBookings()

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
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking._id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
