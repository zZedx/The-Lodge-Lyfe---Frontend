import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2'
import Stat from './Stat'
import { formatCurrency } from '../../utils/helpers'

const Stats = ({ bookings, confirmedStays , numDays , cabinCount }) => {
    const numBookings = bookings.length
    const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)
    const checkIns = confirmedStays.length
    const occupancyRate = confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) / (numDays * cabinCount)
    return (
        <>
            <Stat title="Bookings" color={"blue"} icon={<HiOutlineBriefcase />} value={numBookings} />
            <Stat title="Sales" color={"green"} icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
            <Stat title="Check ins" color={"indigo"} icon={<HiOutlineCalendarDays />} value={checkIns} />
            <Stat title="Occupancy rate" color={"yellow"} icon={<HiOutlineChartBar />} value={Math.round(occupancyRate * 100) + "%"} />
        </>
    )
}

export default Stats