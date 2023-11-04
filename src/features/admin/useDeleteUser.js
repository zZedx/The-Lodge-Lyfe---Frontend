import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser as deleteUserApi } from "../../services/apiAuth"
import toast from "react-hot-toast"

const useDeleteUser = () => {
    const queryClient = useQueryClient()
    const { mutate: deleteUser, status } = useMutation({
        mutationFn: (id) => deleteUserApi(id),
        onSuccess: () => {
            toast.success("User deleted successfully")
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    return { deleteUser, status }
}

export default useDeleteUser