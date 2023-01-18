import { useDispatch, useSelector } from "react-redux"
import { 
    addMedicamento, 
    changeLoadingMedicamentos, 
    deleteMedicamento, 
    setMedicamentos, 
    updateMedicamento 
} from "../store/slices/medicamentos"
import { setPageInformation, startAlert } from "../store/slices/ui"
import { fetchAPI } from "./apiFetch"
import { createContentErrorAlert } from "../helpers"


export const useMedsStore = () => {

    const dispatch = useDispatch()
    const {
        isLoading,
        page,
        medicamentos,
        searchValue
    } = useSelector( state => state.medicamento )

    const { authToken } = useSelector( state => state.auth )

    const startLoadingMedicamentos = async ( queryParams ) => {
        try {

            dispatch( changeLoadingMedicamentos() )
    
            const response = await fetchAPI({ endpoint: 'medicine', queryParams })
            const data = await response.json()
                
            if( response.status !== 200 ){
                dispatch( startAlert( createContentErrorAlert( data ) ) )
                dispatch( changeLoadingMedicamentos() )
            }else{
                dispatch( setMedicamentos({
                    medicamentos: data.medicines
                }))
                dispatch( setPageInformation({
                    page: Number(data.page),
                    totalPages: data.totalPages,
                }))
            }
        } catch (error) {
            dispatch( changeLoadingMedicamentos() )
            dispatch( startAlert({
                alertMessage: 'Error interno, contacte al administrador',
                alertType: 'error'
            }) )
        }
    
    }

    const startAddNewMedicamento = async ( medicamento ) => {

        try {
            const response = await fetchAPI({
                endpoint: 'medicine', 
                data: medicamento, 
                method: 'POST',
                token: authToken
            })

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
                alertMessage: 'Error interno, contacte al administrador',
                alertType: 'error'
            }) )
        }
    }

    const startUpdateMedicamento = async ( medId, medData ) => {
        try {

            const response = await fetchAPI({
                endpoint: `medicine/${ medId }`,
                data: medData,
                method: 'PUT',
                token: authToken
            })
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
                alertMessage: 'Error interno, contacte al administrador',
                alertType: 'error'
            }) )
        }
    }

    const startDeleteMedicamento = async ( medId ) => {
        try {

            const response = await fetchAPI({
                endpoint: `medicine/${medId}`,
                method: 'DELETE',
                token: authToken
            })
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
                alertMessage: 'Error interno, contacte al administrador',
                alertType: 'error',
            }))
        }
    }

    return {
        isLoading,
        page,
        medicamentos,
        searchValue,
        startLoadingMedicamentos,
        startAddNewMedicamento,
        startUpdateMedicamento,
        startDeleteMedicamento,
    }
}