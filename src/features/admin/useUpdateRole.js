import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { updateRole as updateRoleApi } from "../../services/apiAuth"

const useUpdateRole = () => {
    const queryClient = useQueryClient()
    const {mutate : updateRole , status} = useMutation({
        mutationFn : ({id , isAdmin}) => updateRoleApi(id , isAdmin),
        onSuccess : () => {
            toast.success("Role updated successfully")
            queryClient.invalidateQueries({
                queryKey : ['users']
            })
        },
        onError : (err) => {
            toast.error(err.message)
        }
    })
    return {updateRole , status}
}

export default useUpdateRole