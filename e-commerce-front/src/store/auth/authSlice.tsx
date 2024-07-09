import { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import { IsAstring } from "@customTypes/guards";

import authRegister from './actions/register'
import AuthLoginAction from "./actions/login";

interface Istate {
    loading: TLoading,
    error: string | null,
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
      } | null;
      accessToken: string | null;
}

const initialState : Istate = {
    user: null,
  accessToken: null,
    loading: 'idle',
    error: null
}

const authRegisterSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers:{
        resetUi: state => {
            state.loading = 'idle'
            state.error = null
        },
        authLogout: state => {
            state.accessToken = null
            state.user = null
        }
    },
    extraReducers: (builder) => {
        //register
        builder.addCase(authRegister.pending, (state) => {
            state.loading = 'pending'
            state.error= null
        })
        builder.addCase(authRegister.fulfilled, (state) => {
            state.loading= 'succeeded'
        })
        builder.addCase(authRegister.rejected, (state, action) => {
            state.loading = 'failed'
            if (IsAstring(action.payload as string)) {
                state.error = action.payload as string;
            }
        })

        //login
        builder.addCase(AuthLoginAction.pending, (state) => {
            state.loading = 'pending'
            state.error= null
        })
        builder.addCase(AuthLoginAction.fulfilled, (state, action) => {
            state.loading= 'succeeded'
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user;
        })
        builder.addCase(AuthLoginAction.rejected, (state, action) => {
            state.loading = 'failed'
            if (IsAstring(action.payload as string)) {
                state.error = action.payload as string;
            }
        })
    }
})

export const {resetUi, authLogout} = authRegisterSlice.actions

export default authRegisterSlice.reducer