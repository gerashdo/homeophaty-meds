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
                if( dataResponse.msg ){
                    dispatch( startAlert({
                        alertMessage: dataResponse.msg,
                        alertType: 'error'
                    }))
                }else{
                    dispatch( startAlert({
                        alertMessage: Object.values( dataResponse.errors )[0].msg,
                        alertType: 'error'
                    }))
                }
            }else{
                dispatch( loginUser( dataResponse ))
            }
            
        } catch (error) {
            dispatch( startAlert({
                alertMessage: error,
                alertType: 'error'
            }) )
        }
    }
}