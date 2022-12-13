import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setIsLoggedInAC } from '../features/auth/authSlice'
import { authAPI } from '../services/authApi'

import { AppDispatchType } from './store'

const initialState = {
  status: 'idle' as RequestStatusType,
  alertMessage: {
    messageType: 'error' as AlertMessageType,
    messageText: null as AppAlertMessageTextType,
  },
  isInitialized: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<SetRequestStatusPayloadType>) {
      state.status = action.payload.status
    },
    setAppAlertMessage(state, action: PayloadAction<SetAppMessagePayloadType>) {
      state.alertMessage = action.payload
    },
    setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = appSlice.reducer

// ACTIONS
export const { setAppStatusAC, setAppAlertMessage, setIsInitializedAC } = appSlice.actions

// THUNKS
export const initializeAppTC =
  (navigateToLogin: () => void, setIsAppLoaded: () => void) =>
  async (dispatch: AppDispatchType) => {
    try {
      const response = await authAPI.me()

      console.log(response.data.name)
      // Задиспатчить имя Юзера которое пришло с сервера
      dispatch(setIsInitializedAC({ isInitialized: true }))
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    } catch (e) {
      navigateToLogin()
    } finally {
      setIsAppLoaded()
    }
  }

// Types
export type RequestStatusType = 'idle' | 'loading'
export type AlertMessageType = 'success' | 'error'
export type AppAlertMessageTextType = string | null
type SetAppMessagePayloadType = {
  messageType: AlertMessageType
  messageText: AppAlertMessageTextType
}
export type SetRequestStatusPayloadType = { status: RequestStatusType }
