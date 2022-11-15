import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertActive: false,
    alertMessage: '',
    alertType: null,
    alertDuration: 8,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        startAlert: ( state, action ) => {
            state.alertActive = true
            state.alertMessage = action.payload.alertMessage
            state.alertType = action.payload.alertType
            state.alertDuration = action.payload.alertDuration || state.alertDuration
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