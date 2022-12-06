import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth'
import { medicamentoSlice } from './slices/medicamentos'
import { uiSlice } from './slices/ui/uiSlice'


export const store = configureStore({
    reducer:{
        medicamento: medicamentoSlice.reducer,
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
    },
})