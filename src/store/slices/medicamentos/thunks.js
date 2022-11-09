import { fetchSinToken } from "../../../hooks/apiFetch"
import { addMedicamento, setMedicamentos, startLoadingMedicamentos, updateMedicamento } from "./medicamentoSlice"


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

export const addNewMedicamento = ( medicamento ) => {
    return async( dispatch, getState ) => {
        try {
            const response = await fetchSinToken('medicine', medicamento, 'POST')
            const data = await response.json()
    
            if( data.ok ){
                dispatch( addMedicamento({ 
                    medicamento: data.medicine 
                }))
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const startUpdateMedicamento = ( medId, medData ) => {
    return async( dispatch, getState ) => {
        try {
            const response = await fetchSinToken(
                `medicine/${ medId }`,
                medData,
                'PUT'
            )
            const data = await response.json()

            if( data.ok ){
                dispatch( updateMedicamento( data.medicine ) )
            }else{
                console.log( data )
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}