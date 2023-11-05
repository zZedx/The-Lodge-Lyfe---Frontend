import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCurrentUser } from "../../services/apiAuth"
import toast from "react-hot-toast"

const useUpdateUser = () => {
    const queryClient = useQueryClient()
    const {mutate : updateUser , status} = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.success("User Updated")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {updateUser , status}
}

export default useUpdateUser