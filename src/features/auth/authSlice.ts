import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { RequestStatusPayloadType, setAppAlertMessage, setAppStatus } from '../../app/appSlice'
import {
  authAPI,
  CreatePasswordParamsType,
  LoginParamsType,
  RegisterParamsType,
} from '../../services/authApi'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { setUserData } from '../profile/profileSlice'

const initialState = {
  isLoggedIn: false,
  recoveryEmail: '',
  status: 'idle' as RequestStatusPayloadType,
  passwordIsChanged: false,
}

export const logInTC = createAsyncThunk(
  'auth/logIn',
  async (data: LoginParamsType, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.login(data)
      const { _id, name, email, avatar } = response.data

      dispatch(setUserData({ userData: { id: _id, name, email, avatar } }))
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

export const logOutTC = createAsyncThunk(
  'auth/logOut',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus('loading'))
      await authAPI.logout()
      dispatch(setUserData({ userData: { id: '', name: '', email: '', avatar: undefined } }))
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus('idle'))
    }
  }
)

export const registerTC = createAsyncThunk(
  'auth/register',
  async (data: RegisterParamsType, { dispatch, rejectWithValue }) => {
    try {
      await authAPI.register(data)

      dispatch(
        setAppAlertMessage({
          messageType: 'success',
          messageText: 'Congratulations, your account has been successfully registered',
        })
      )

      return true
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

export const forgotPasswordTC = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { dispatch, rejectWithValue }) => {
    try {
      const res = await authAPI.forgot(email)

      dispatch(
        setAppAlertMessage({
          messageType: 'success',
          messageText: res.data.info,
        })
      )

      return email
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

export const createPasswordTC = createAsyncThunk(
  'auth/createPassword',
  async (data: CreatePasswordParamsType, { dispatch, rejectWithValue }) => {
    try {
      await authAPI.newPassword(data)

      return true
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setRecoveryEmail(state, action: PayloadAction<{ recoveryEmail: string }>) {
      state.recoveryEmail = action.payload.recoveryEmail
    },
    setPasswordStatus(state, action: PayloadAction<SetPasswordStatusType>) {
      state.passwordIsChanged = action.payload.passwordIsChanged
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logInTC.pending, state => {
        state.status = 'loading'
      })
      .addCase(logInTC.fulfilled, state => {
        state.isLoggedIn = true
        state.status = 'idle'
      })
      .addCase(logInTC.rejected, state => {
        state.status = 'idle'
      })

    builder.addCase(logOutTC.fulfilled, state => {
      state.isLoggedIn = false
    })

    builder
      .addCase(registerTC.pending, state => {
        state.status = 'loading'
      })
      .addCase(registerTC.fulfilled, state => {
        state.status = 'idle'
      })
      .addCase(registerTC.rejected, state => {
        state.status = 'idle'
      })

    builder
      .addCase(forgotPasswordTC.pending, state => {
        state.status = 'loading'
      })
      .addCase(forgotPasswordTC.fulfilled, (state, action) => {
        state.recoveryEmail = action.payload
        state.status = 'idle'
      })
      .addCase(forgotPasswordTC.rejected, state => {
        state.status = 'idle'
      })

    builder.addCase(createPasswordTC.fulfilled, (state, action) => {
      state.passwordIsChanged = action.payload
    })
  },
})

export const authReducer = authSlice.reducer

// ACTIONS
export const { setIsLoggedIn, setRecoveryEmail, setPasswordStatus } = authSlice.actions

// TYPES
export type AuthStateType = typeof initialState

type SetPasswordStatusType = {
  passwordIsChanged: boolean
}
