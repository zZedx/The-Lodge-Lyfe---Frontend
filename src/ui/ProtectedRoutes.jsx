import { useEffect } from "react"
import styled from "styled-components"
import useUser from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import ServerError from "./ServerError"

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ProtectedRoutes = ({ children }) => {
    const { isLoading, user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !isLoading) navigate('/login')
    }, [user, navigate, isLoading])

    if (isLoading) return <FullPage><Spinner /></FullPage>
    // if (isError) return <ServerError />

    return children
}
