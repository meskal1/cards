import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import {
  RequestStatusType,
  setAppAlertMessage,
  setAppStatusAC,
  setIsInitializedAC,
  SetRequestStatusPayloadType,
} from '../../app/appSlice'
import { AppDispatchType } from '../../app/store'
import { authAPI, LoginParamsType, RegisterParamsType } from '../../services/authApi'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { setProfile } from '../profile/profileReducer'

const initialState = {
  isLoggedIn: false,
  recoveryEmail: '',
  status: 'idle' as RequestStatusType,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setAuthStatus(state, action: PayloadAction<SetRequestStatusPayloadType>) {
      state.status = action.payload.status
    },
    setRecoveryEmail(state, action: PayloadAction<{ recoveryEmail: string }>) {
      state.recoveryEmail = action.payload.recoveryEmail
    },
  },
})

export const authReducer = authSlice.reducer

// ACTIONS
export const { setIsLoggedInAC, setAuthStatus, setRecoveryEmail } = authSlice.actions

// THUNKS
export const logInTC = (data: LoginParamsType) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatusAC({ status: 'loading' }))
    const response = await authAPI.login(data)

    console.log(response.data.name)
    // Задиспатчить имя Юзера которое пришло с сервера
    const { name, email, avatar } = response.data

    dispatch(setProfile({ name, email, avatar }))
    dispatch(setIsLoggedInAC({ isLoggedIn: true }))
  } catch (e) {
    const error = e as Error | AxiosError

    handleServerNetworkError(dispatch, error)
  } finally {
    dispatch(setAppStatusAC({ status: 'idle' }))
  }
}

export const logOutTC = () => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatusAC({ status: 'loading' }))
    await authAPI.logout()
    dispatch(setIsInitializedAC({ isInitialized: false }))
    dispatch(setProfile({ name: '', email: '', avatar: undefined }))
    dispatch(setIsLoggedInAC({ isLoggedIn: false }))
  } catch (e) {
    const error = e as Error | AxiosError

    handleServerNetworkError(dispatch, error)
  }
}

export const registerTC = (data: RegisterParamsType) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAuthStatus({ status: 'loading' }))
    const res = await authAPI.register(data)

    dispatch(
      setAppAlertMessage({
        messageType: 'success',
        messageText: 'Congratulations, your account has been successfully registered',
      })
    )

    return true
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  } finally {
    dispatch(setAuthStatus({ status: 'idle' }))
  }
}

export const forgotPasswordTC = (email: string) => async (dispatch: AppDispatchType) => {
  try {
    setAuthStatus({ status: 'loading' })
    const res = await authAPI.forgot(email)

    dispatch(setRecoveryEmail({ recoveryEmail: email }))
    dispatch(
      setAppAlertMessage({
        messageType: 'success',
        messageText: res.data.info,
      })
    )

    return true
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  } finally {
    dispatch(setAuthStatus({ status: 'idle' }))
  }
}

// TYPES
export type AuthStateType = typeof initialState
