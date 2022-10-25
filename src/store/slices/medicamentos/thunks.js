import { fetchSinToken } from "../../../hooks/apiFetch"
import { setMedicamentos, startLoadingMedicamentos } from "./medicamentoSlice"


export const getMedicamentos = ( page = 0 ) => {
    return async( dispatch, getState ) => {

        dispatch( startLoadingMedicamentos() )

        const response = await fetchSinToken('medicine')
        const data = await response.json()

        if( data.ok ){
            dispatch( setMedicamentos({
                page: page + 1,
                medicamentos: data.medicines
            }))
        }
    }
}