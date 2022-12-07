import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const PrivateRouter = ({ children }) => {

    const { usertAuth } = useSelector( state => state.auth )

    return usertAuth
        ? children
        : <Navigate to='/login' replace />
}