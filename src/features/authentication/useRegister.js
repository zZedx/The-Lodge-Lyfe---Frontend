import { useMutation } from "@tanstack/react-query"
import {useNavigate} from "react-router-dom"
import { register as registerApi} from "../../services/apiAuth"
import toast from "react-hot-toast"

const useRegister = () => {
    const navigate = useNavigate()
    const { mutate : register, status} = useMutation({
        mutationFn: ({ email, password , name}) => registerApi(email, password , name),
        onSuccess: () => {
            navigate("/dashboard" , {replace : true})
        },
        onError: (e) => toast.error(e.message)
    })

    return {register , status}
}

export default useRegister