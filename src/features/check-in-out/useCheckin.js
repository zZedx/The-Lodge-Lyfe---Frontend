import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const useCheckin = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: checkin, isLoading : isCheckingIn } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId),
        onSuccess: () => {
            toast.success("Checked-in successfully")
            queryClient.invalidateQueries({ active: true })
            navigate('/')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return { checkin, isCheckingIn}
}

export default useCheckin