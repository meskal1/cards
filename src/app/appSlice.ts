import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setIsLoggedIn } from '../features/auth/authSlice'
import { setUserData } from '../features/profile/profileSlice'
import { authAPI } from '../services/authApi'

export const initializeAppTC = createAsyncThunk(
  'app/initializeApp',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.me()
      const { _id, name, email, avatar } = response.data

      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setUserData({ id: _id, name, email, avatar }))
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const initialState = {
  status: 'idle' as RequestStatusType,
  alertMessage: {
    messageType: 'error' as AlertMessageType,
    messageText: null as AppAlertMessageTextType,
  },
  isInitialized: false,
  tableStatus: 'idle' as RequestStatusType,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload
    },
    setAppAlertMessage(state, action: PayloadAction<SetAppMessagePayloadType>) {
      state.alertMessage = action.payload
    },
    setTableStatus(state, action: PayloadAction<RequestStatusType>) {
      state.tableStatus = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initializeAppTC.fulfilled, state => {
        state.isInitialized = true
      })
      .addCase(initializeAppTC.rejected, (state, action) => {
        const error = action.payload as Error | AxiosError

        if (axios.isAxiosError(error)) {
          const err = error.response?.data
            ? (error.response.data as { error: 'string' }).error
            : error.message

          console.log(err)
        }
        state.isInitialized = true
      })
  },
})

export const appReducer = appSlice.reducer

// ACTIONS
export const { setAppStatus, setAppAlertMessage, setTableStatus } = appSlice.actions

// TYPES
export type AppStateType = typeof initialState

export type RequestStatusType = 'idle' | 'loading'

export type AlertMessageType = 'success' | 'error'

export type AppAlertMessageTextType = string | null

type SetAppMessagePayloadType = {
  messageType: AlertMessageType
  messageText: AppAlertMessageTextType
}

export type SetRequestStatusPayloadType = {
  status: RequestStatusType
}

export type SetAppInitializedPayloadType = {
  isInitialized: boolean
}
