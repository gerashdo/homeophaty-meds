import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  alertActive: false,
  alertMessage: '',
  alertType: null,
  alertDuration: 8,
  page: 1,
  totalPages: 0
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startAlert: (state, action) => {
      state.alertActive = true
      state.alertMessage = action.payload.alertMessage
      state.alertType = action.payload.alertType
      state.alertDuration = action.payload.alertDuration || state.alertDuration
    },
    stopAlert: (state) => {
      state.alertActive = false
    },
    setPageInformation: (state, action) => {
      state.page = action.payload.page
      state.totalPages = action.payload.totalPages
    }
  }
})

export const {
  startAlert,
  stopAlert,
  setPageInformation
} = uiSlice.actions
