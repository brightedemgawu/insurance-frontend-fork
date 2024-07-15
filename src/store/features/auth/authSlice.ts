import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthenticatedUser} from "@/types/authentication";
import {SuccessfulLoginDto} from "@/services/authentication/dtos/response/SuccessfulLoginDto";
import {decodeToken} from "@/lib/utils";
import {OtpVerificationSuccessfulDto} from "@/services/authentication/dtos/response/OtpVerificationSuccessfulDto";
import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";

export interface AuthState {
    authenticatedUser: AuthenticatedUser | null,
    mfa: OtpVerificationSuccessfulDto | null,
    userDetails: EmployeeReadDto | null
}

const initialState: AuthState = {
    authenticatedUser: null,
    mfa: null,
    userDetails: null
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state: AuthState, action: PayloadAction<AuthenticatedUser | null>) => {
            return {...state, authenticatedUser: action.payload}
        },

        setUserDetails: (state: AuthState, action: PayloadAction<EmployeeReadDto | null>) => {
            return {...state, userDetails: action.payload}
        },

        setMfa: (state: AuthState, action: PayloadAction<OtpVerificationSuccessfulDto | null>) => {
            return {...state, mfa: action.payload}
        },
        clearMfa: (state: AuthState, action: PayloadAction<void>) => {
            return {...state, mfa: null}
        },
        reConnectMfa: (state: AuthState, action: PayloadAction<OtpVerificationSuccessfulDto>) => {
            return {...state, mfa: action.payload};
        },
        clearAuthUser: (state: AuthState) => {
            return {...state, authenticatedUser: null, mfa: null};
        },
        updateAuthenticatedWithTokenUser: (state: AuthState, action: PayloadAction<SuccessfulLoginDto>) => {
            return {...state, authenticatedUser: decodeToken(action.payload)}
        },
        clearAuthStore: (state: AuthState) => {
            return {authenticatedUser: null, mfa: null, userDetails: null}
        }
    }
})

export const {
    setAuthUser,
    clearAuthUser,
    clearAuthStore,
    updateAuthenticatedWithTokenUser,
    setMfa,
    clearMfa,
    reConnectMfa,
    setUserDetails
} = authSlice.actions
export default authSlice.reducer;
