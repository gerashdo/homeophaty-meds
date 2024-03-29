import { useDispatch, useSelector } from "react-redux"
import { createContentErrorAlert, deleteUserAndToken, saveUserAndToken } from "../helpers"
import { loginUser, logoutUser, renovateToken } from "../store/slices/auth"
import { startAlert } from "../store/slices/ui"
import { fetchAPI } from "./apiFetch"


export const useAuthStore = () => {

    const { usertAuth, authToken } = useSelector( state => state.auth )
    const dispatch = useDispatch()

    const startLoginUser = async( data ) => {
        const url = 'auth/login'
        try {
            const response = await fetchAPI({ 
                endpoint: url, 
                data, 
                method: 'POST'
            })
            const dataResponse = await response.json()

            if( response.status !== 200 ){
                dispatch( startAlert( createContentErrorAlert( dataResponse )))
            }else{
                dispatch( loginUser( dataResponse ))
                saveUserAndToken( dataResponse.token, JSON.stringify( dataResponse.user ) )
            }
            
        } catch (error) {
            dispatch( startAlert({
                alertMessage: error.toString(),
                alertType: 'error'
            }) )
        }
    }

    const startRenovateToken = async() => {
        try {
            const response = await fetchAPI({ 
                endpoint: 'auth/renovate',
                method: 'GET',
                token: authToken
            })

            const data = await response.json()
    
            if( response.status !== 200 ){
                dispatch( logoutUser() )
                deleteUserAndToken()
                dispatch( startAlert( createContentErrorAlert( data ) ) )
            }else{
                dispatch( renovateToken( data.token ) )
                saveUserAndToken( data.token, data.user )
            }
            
        } catch (error) {
            dispatch( startAlert({
                alertMessage: error.toString(),
                alertType: 'error'
            }) )
        }
    }

    return {
        usertAuth,
        authToken,
        startLoginUser,
        startRenovateToken,
    }
}