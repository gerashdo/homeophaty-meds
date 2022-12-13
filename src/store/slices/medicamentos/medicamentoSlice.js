import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    page: 0,
    medicamentos: [],
    searchValue: ''
}

export const medicamentoSlice = createSlice({
    name: 'medicamento',
    initialState,
    reducers: {
        changeLoadingMedicamentos: ( state ) => {
            state.isLoading = !state.isLoading
        },
        setMedicamentos: (state, action ) => {
            state.isLoading = false
            state.page = action.payload.page
            state.medicamentos = action.payload.medicamentos
        },
        addMedicamento: (state, action ) => {
            state.medicamentos = [ ...state.medicamentos, action.payload.medicamento ]
        },
        updateMedicamento: ( state, action ) => {
            state.medicamentos = state.medicamentos.map( med => (
                med.id === action.payload.id ? action.payload : med
            ))
        },
        deleteMedicamento: ( state, action ) => {
            state.medicamentos = state.medicamentos.filter( med => med.id !== action.payload.id )
        },
        changeSearchValue: ( state, action ) => {
            state.searchValue = action.payload
        }
    },
})

export const { 
    changeLoadingMedicamentos, 
    setMedicamentos, 
    addMedicamento, 
    updateMedicamento, 
    deleteMedicamento,
    changeSearchValue,
} = medicamentoSlice.actions
