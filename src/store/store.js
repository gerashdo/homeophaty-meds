import { configureStore } from '@reduxjs/toolkit'

import { medicamentoSlice } from './slices/medicamentos'


export const store = configureStore({
    reducer:{
        medicamento: medicamentoSlice.reducer
    },
})