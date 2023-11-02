import { useMutation } from "@tanstack/react-query"
import {useNavigate} from "react-router-dom"
import { login as loginApi} from "../../services/apiAuth"
import toast from "react-hot-toast"

const useLogin = () => {
    const navigate = useNavigate()
    const { mutate : login, status} = useMutation({
        mutationFn: ({ email, password }) => loginApi(email, password),
        onSuccess: () => {
            navigate("/dashboard")
        },
        onError: (e) => toast.error(e.message)
    })

    return {login , status}
}

export default useLogin