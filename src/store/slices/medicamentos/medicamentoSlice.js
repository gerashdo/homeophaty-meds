import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    page: 0,
    medicamentos: []
}

export const medicamentoSlice = createSlice({
    name: 'medicamento',
    initialState,
    reducers: {
        startLoadingMedicamentos: ( state ) => {
            state.isLoading = true
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
        }
    },
})

export const { startLoadingMedicamentos, setMedicamentos, addMedicamento, updateMedicamento } = medicamentoSlice.actions
