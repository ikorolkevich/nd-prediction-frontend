import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { AuthState, User } from '../../types/auth'

const initialState: AuthState = {
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            localStorage.setItem('token', action.payload)
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        logOut: (state) => {
            state.user = null
            localStorage.removeItem('token')
        }
    },
})

export const { setToken, setUser, logOut } = authSlice.actions
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer