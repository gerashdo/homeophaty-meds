import { configureStore } from '@reduxjs/toolkit'
import { medicamentoSlice } from './slices/medicamentos'
import { uiSlice } from './slices/ui/uiSlice'


export const store = configureStore({
    reducer:{
        medicamento: medicamentoSlice.reducer,
        ui: uiSlice.reducer,
    },
})