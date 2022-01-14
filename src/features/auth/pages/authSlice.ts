import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';
export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User | null;
}
export interface LoginPayload {
    username: string;
    password: string;
}
const initialState:AuthState = {
    isLoggedIn : false,
    logging : false,
    currentUser : null
}
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login(state,action:PayloadAction<LoginPayload>) {
            state.logging=true
        },
        loginSuccess(state,action:PayloadAction<User>) {
            state.logging= false
            state.currentUser= action.payload
        },
        loginFailed(state,action:PayloadAction<string>) {
            state.logging= false
        },
        logout(state) {
            state.currentUser = null
        }
    }
})

export const authAction = authSlice.actions
export default authSlice.reducer
