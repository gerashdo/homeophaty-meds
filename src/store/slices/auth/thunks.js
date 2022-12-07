import { createContentErrorAlert } from "../../../helpers"
import { fetchSinToken } from "../../../hooks/apiFetch"
import { startAlert } from "../ui"
import { loginUser } from "./authSlice"



export const startLoginUser = ( data ) => {
    return async( dispatch, getState ) => {
        const url = 'auth/login'
        try {
            const response = await fetchSinToken( url, data, 'POST')
            const dataResponse = await response.json()

            if( response.status !== 200 ){
                dispatch( startAlert( createContentErrorAlert( dataResponse )))
            }else{
                dispatch( loginUser( dataResponse ))
                localStorage.setItem( "token", dataResponse.token )
                localStorage.setItem( "user", JSON.stringify( dataResponse.user ))
            }
            
        } catch (error) {
            dispatch( startAlert({
                alertMessage: error,
                alertType: 'error'
            }) )
        }
    }
}