
import { Navigate } from "react-router-dom"
import { useAuthStore } from "../hooks"

export const PrivateRouter = ({ children }) => {

    const { usertAuth } = useAuthStore()

    return usertAuth
        ? children
        : <Navigate to='/login' replace />
}