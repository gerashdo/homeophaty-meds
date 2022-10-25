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
        }

    },
})

export const { incrementByAmount, startLoadingMedicamentos, setMedicamentos } = medicamentoSlice.actions
