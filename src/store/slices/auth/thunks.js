import { createContentErrorAlert, deleteUserAndToken, saveUserAndToken } from "../../../helpers"
import { fetchAPI } from "../../../hooks/apiFetch"
import { startAlert } from "../ui"
import { loginUser, logoutUser, renovateToken } from "./authSlice"



export const startLoginUser = ( data ) => {
    return async( dispatch, getState ) => {
        const url = 'auth/login'
        try {
            const response = await fetchAPI( url, data, 'POST')
            const dataResponse = await response.json()

            if( response.status !== 200 ){
                dispatch( startAlert( createContentErrorAlert( dataResponse )))
            }else{
                dispatch( loginUser( dataResponse ))
                saveUserAndToken( dataResponse.token, JSON.stringify( dataResponse.user ) )
            }
            
        } catch (error) {
            dispatch( startAlert({
                alertMessage: error,
                alertType: 'error'
            }) )
        }
    }
}

export const startRenovateToken = () => {
    return async( dispatch, getState ) => {

        try {
            const { auth } = getState()
            const { authToken } = auth

            console.log( authToken )
    
            const response = await fetchAPI( 
                'auth/renovate',
                {},
                'GET',
                authToken
            )
            console.log( response )
            const data = await response.json()
    
            if( response.status !== 200 ){
                dispatch( logoutUser() )
                deleteUserAndToken()
                dispatch( startAlert( createContentErrorAlert( data ) ) )
            }else{
                dispatch( renovateToken( data.token ) )
                saveUserAndToken( data.token )
            }
            
        } catch (error) {
            dispatch( startAlert({
                alertMessage: error,
                alertType: 'error'
            }) )
        }

    }
}