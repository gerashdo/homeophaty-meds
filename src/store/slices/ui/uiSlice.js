import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertActive: false,
    alertMessage: '',
    alertType: null,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        startAlert: ( state, action ) => {
            state.alertActive = true
            state.alertMessage = action.payload.alertMessage
            state.alertType = action.payload.alertType
        },
        stopAlert: ( state ) => {
            state.alertActive = false
        }
    }
})

export const { 
    startAlert, 
    stopAlert,
} = uiSlice.actions