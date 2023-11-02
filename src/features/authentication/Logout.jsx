import { HiArrowRightOnRectangle } from "react-icons/hi2"
import ButtonIcon from "../../ui/ButtonIcon"
import useLogout from "./useLogout"

const Logout = () => {
    const { logout, status } = useLogout()
    function handleClick() {
        logout()
    }
    return (
        <ButtonIcon onClick={handleClick} disabled={status === "pending"}><HiArrowRightOnRectangle /></ButtonIcon>
    )
}

export default Logout