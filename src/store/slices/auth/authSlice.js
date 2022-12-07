import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    usertAuth: JSON.parse(localStorage.getItem("user")) || null,
    authToken: localStorage.getItem("token") || null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginUser: ( state, action ) => {
            state.usertAuth = action.payload.user
            state.authToken = action.payload.token
        },
        logoutUser: ( state ) => {
            state.usertAuth = null
            state.authToken = null
        }
    }
})

export const { loginUser, logoutUser } = authSlice.actions