import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    usertAuth: null,
    authToken: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginUser: ( state, action ) => {
            state.usertAuth = action.payload.user
            state.authToken = action.payload.token
        }
    }
})

export const { loginUser } = authSlice.actions