import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setIsLoggedIn } from '../features/auth/authSlice'
import { setUserData } from '../features/profile/profileSlice'
import { authAPI } from '../services/authApi'

import { AppDispatchType } from './store'

const initialState = {
  status: 'idle' as RequestStatusPayloadType,
  alertMessage: {
    messageType: 'error' as AlertMessageType,
    messageText: null as AppAlertMessageTextType,
  },
  isInitialized: false,
  tableStatus: 'idle' as RequestStatusPayloadType,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<RequestStatusPayloadType>) {
      state.status = action.payload
    },
    setAppAlertMessage(state, action: PayloadAction<SetAppMessagePayloadType>) {
      state.alertMessage = action.payload
    },
    setIsInitialized(state, action: PayloadAction<SetAppInitializedPayloadType>) {
      state.isInitialized = action.payload.isInitialized
    },
    setTableStatus(state, action: PayloadAction<RequestStatusPayloadType>) {
      state.tableStatus = action.payload
    },
  },
})

export const appReducer = appSlice.reducer

// ACTIONS
export const { setAppStatus, setAppAlertMessage, setIsInitialized, setTableStatus } =
  appSlice.actions

// THUNKS
export const initializeAppTC = () => async (dispatch: AppDispatchType) => {
  try {
    const response = await authAPI.me()
    const { _id, name, email, avatar } = response.data

    dispatch(setUserData({ userData: { id: _id, name, email, avatar } }))
    dispatch(setIsLoggedIn({ isLoggedIn: true }))
  } catch (e) {
    const error = e as Error | AxiosError

    if (axios.isAxiosError(error)) {
      const err = error.response?.data
        ? (error.response.data as { error: 'string' }).error
        : error.message

      console.log(err)
    }
  } finally {
    dispatch(setIsInitialized({ isInitialized: true }))
  }
}

// TYPES
export type AppStateType = typeof initialState

export type RequestStatusPayloadType = 'idle' | 'loading'

export type AlertMessageType = 'success' | 'error'

export type AppAlertMessageTextType = string | null

type SetAppMessagePayloadType = {
  messageType: AlertMessageType
  messageText: AppAlertMessageTextType
}

export type SetRequestStatusPayloadType = {
  status: RequestStatusPayloadType
}

export type SetAppInitializedPayloadType = {
  isInitialized: boolean
}
