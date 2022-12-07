import { createContentErrorAlert } from "../../../helpers"
import { fetchAPI } from "../../../hooks/apiFetch"
import { startAlert } from "../ui"
import { addMedicamento, deleteMedicamento, setMedicamentos, startLoadingMedicamentos, updateMedicamento } from "./medicamentoSlice"


export const getMedicamentos = ( page = 0 ) => {
    return async( dispatch, getState ) => {

        dispatch( startLoadingMedicamentos() )

        const response = await fetchAPI('medicine')
        const data = await response.json()

        if( response.status !== 200 ){
            dispatch( startAlert( createContentErrorAlert( data ) ) )
        }else{
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
            const { auth } = getState()
            const { authToken } = auth

            const response = await fetchAPI(
                'medicine', 
                medicamento, 
                'POST',
                authToken
            )
            const data = await response.json()
    
            if( response.status === 201 ){
                dispatch( addMedicamento({ 
                    medicamento: data.medicine 
                }))
                dispatch( startAlert({
                    alertMessage: 'Nuevo medicamento guardado',
                    alertType: 'success'
                }))
            }else{
                dispatch( startAlert( createContentErrorAlert( data ) ) )
            }
            
        } catch (error) {
            dispatch( startAlert({
                alertMessage: error,
                alertType: 'error'
            }) )
        }
    }
}

export const startUpdateMedicamento = ( medId, medData ) => {
    return async( dispatch, getState ) => {
        try {
            const response = await fetchAPI(
                `medicine/${ medId }`,
                medData,
                'PUT'
            )
            const data = await response.json()

            if( response.status === 200 ){
                dispatch( updateMedicamento( data.medicine ) )
                dispatch( startAlert({
                    alertMessage: 'El medicamento se ha modificado exitosamente',
                    alertType: 'success'
                }))
            }else{
                dispatch( startAlert( createContentErrorAlert( data ) ) )
            }
            
        } catch (error) {
            dispatch( startAlert({
                alertMessage: error,
                alertType: 'error'
            }) )
        }
    }
}

export const startDeleteMedicamento = ( medId ) => {
    return async( dispatch, getState ) => {
        try {
            
            const response = await fetchAPI(
                `medicine/${medId}`,
                {},
                'DELETE'
            )
            const data = await response.json()
            
            if( response.status === 202 ){
                dispatch( deleteMedicamento({ id: medId }) )
                dispatch( startAlert({
                    alertMessage: 'El medicamento ha sido eliminado',
                    alertType: 'success'
                }))
            }else{
                dispatch( startAlert( createContentErrorAlert( data ) ) )
            }

        } catch (error) {
            dispatch( startAlert({
                alertMessage: error,
                alertType: 'error',
            }))
        }
    }
}