import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface AuthState {
    authenticatedUser: { email: string } | null
}

const initialState: AuthState = {
    authenticatedUser: null
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state: AuthState, action: PayloadAction<{ email: string } | null>) => {
            return {...state, authenticatedUser: action.payload}
        },

        clearAuthUser: (state: AuthState) => {
            return {...state, authenticatedUser: null};
        },
        clearAuthStore: (state: AuthState) => {
            return {authenticatedUser: null}
        }
    }
})

export const {setAuthUser, clearAuthUser, clearAuthStore} = authSlice.actions
export default authSlice.reducer;
