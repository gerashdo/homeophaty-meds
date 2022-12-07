
import { Navigate } from "react-router-dom"
import { useAuthStore } from "../hooks"


export const PublicRouter = ({ children }) => {

    const { usertAuth } = useAuthStore()

    return !usertAuth
        ? children 
        : <Navigate to='/' replace />
    
}