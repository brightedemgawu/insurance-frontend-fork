import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthenticatedUser} from "@/types/authentication";
import {SuccessfulLoginDto} from "@/services/authentication/dtos/response/SuccessfulLoginDto";
import {decodeToken} from "@/lib/utils";

export interface AuthState {
    authenticatedUser: AuthenticatedUser | null
}

const initialState: AuthState = {
    authenticatedUser: null
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state: AuthState, action: PayloadAction<AuthenticatedUser | null>) => {
            return {...state, authenticatedUser: action.payload}
        },

        clearAuthUser: (state: AuthState) => {
            return {...state, authenticatedUser: null};
        },
        updateAuthenticatedWithTokenUser: (state: AuthState, action: PayloadAction<SuccessfulLoginDto>) => {
            return {...state, authenticatedUser: decodeToken(action.payload)}
        },
        clearAuthStore: (state: AuthState) => {
            return {authenticatedUser: null}
        }
    }
})

export const {
    setAuthUser,
    clearAuthUser,
    clearAuthStore,
    updateAuthenticatedWithTokenUser
} = authSlice.actions
export default authSlice.reducer;
