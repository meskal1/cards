import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import {
  setAppStatusAC,
  setIsInitializedAC,
  RequestStatusType,
  setAppAlertMessage,
  SetRequestStatusPayloadType, } from '../../app/appSlice'
import { AppDispatchType } from '../../app/store'
import { LoginParamsType, authAPI, RegisterParamsType, RegisterFailResponseType } from '../../services/authApi'
import { handleServerNetworkError } from '../../utils/errorUtils'

const initialState = {
  isLoggedIn: false,
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
  }})
export const authReducer = authSlice.reducer

// ACTIONS
export const { setIsLoggedInAC, setAuthStatus } = authSlice.actions

// THUNKS
export const logInTC = (data: LoginParamsType) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatusAC({ status: 'loading' }))
    const response = await authAPI.login(data)

    console.log(response.data.name)
    // Задиспатчить имя Юзера которое пришло с сервера
    dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    dispatch(setAppStatusAC({ status: 'succeeded' }))
  } catch (e) {
    const error = e as Error | AxiosError

    handleServerNetworkError(dispatch, error)
    dispatch(setAppStatusAC({ status: 'failed' }))
  }
}

export const logOutTC = () => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatusAC({ status: 'loading' }))
    await authAPI.logout()
    dispatch(setIsInitializedAC({ isInitialized: false }))
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
    if (axios.isAxiosError<RegisterFailResponseType>(e)) {
      const error = e.response ? e.response.data.error : 'Some error'

      dispatch(setAppAlertMessage({ messageType: 'error', messageText: error }))
    }
  } finally {
    dispatch(setAuthStatus({ status: 'idle' }))
  }
}
