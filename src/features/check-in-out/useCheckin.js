import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const useCheckin = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, { status: "checked-in", isPaid: true, ...breakfast }),
        onSuccess: () => {
            toast.success("Checked-in successfully")
            queryClient.invalidateQueries({ active: true })
            navigate('/')
        },
        onError: (e) => {
            toast.error(e.message)
        }
    })

    return { checkin, isCheckingIn }
}

export default useCheckin