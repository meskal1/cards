import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import {
  RequestStatusPayloadType,
  setAppAlertMessage,
  setAppStatus,
  SetRequestStatusPayloadType,
} from '../../app/appSlice'
import { AppDispatchType } from '../../app/store'
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setAuthStatus(state, action: PayloadAction<SetRequestStatusPayloadType>) {
      state.status = action.payload.status
    },
    setRecoveryEmail(state, action: PayloadAction<{ recoveryEmail: string }>) {
      state.recoveryEmail = action.payload.recoveryEmail
    },
    setPasswordStatus(state, action: PayloadAction<SetPasswordStatusType>) {
      state.passwordIsChanged = action.payload.passwordIsChanged
    },
  },
})

export const authReducer = authSlice.reducer

// ACTIONS
export const { setIsLoggedIn, setAuthStatus, setRecoveryEmail, setPasswordStatus } =
  authSlice.actions

// THUNKS
export const logInTC = (data: LoginParamsType) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAuthStatus({ status: 'loading' }))
    const response = await authAPI.login(data)
    const { _id, name, email, avatar } = response.data

    dispatch(setUserData({ userData: { id: _id, name, email, avatar } }))
    dispatch(setIsLoggedIn({ isLoggedIn: true }))

    return true
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  } finally {
    dispatch(setAuthStatus({ status: 'idle' }))
  }
}

export const logOutTC = () => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatus('loading'))
    await authAPI.logout()
    dispatch(setUserData({ userData: { id: '', name: '', email: '', avatar: undefined } }))
    dispatch(setIsLoggedIn({ isLoggedIn: false }))
  } catch (e) {
    const error = e as Error | AxiosError

    handleServerNetworkError(dispatch, error)
  } finally {
    dispatch(setAppStatus('idle'))
  }
}

export const registerTC = (data: RegisterParamsType) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAuthStatus({ status: 'loading' }))
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

export const createPasswordTC =
  (data: CreatePasswordParamsType) => async (dispatch: AppDispatchType) => {
    try {
      await authAPI.newPassword(data)
      dispatch(setPasswordStatus({ passwordIsChanged: true }))
    } catch (e) {
      const error = e as Error | AxiosError

      handleServerNetworkError(dispatch, error)
    }
  }

// TYPES
export type AuthStateType = typeof initialState

type SetPasswordStatusType = {
  passwordIsChanged: boolean
}
