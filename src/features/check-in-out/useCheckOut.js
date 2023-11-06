import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"

const useCheckout = () => {
    const queryClient = useQueryClient()

    const { mutate: checkout, isLoading: isCheckingOut , status } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, { status: "checked-out"}),
        onSuccess: () => {
            toast.success("Checked-Out successfully")
            queryClient.invalidateQueries({ active: true })
        },
        onError: (e) => {
            toast.error(e.message)
        }
    })

    return { checkout, isCheckingOut , status}
}

export default useCheckout