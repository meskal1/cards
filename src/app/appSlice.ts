import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as AppAlertMessageTextType,
  alertMessage: {
    messageType: 'error' as AlertMessageType,
    messageText: null as AppAlertMessageTextType,
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<SetRequestStatusPayloadType>) {
      state.status = action.payload.status
    },
    setAppAlertMessage(state, action: PayloadAction<SetAppMessagePayloadType>) {
      state.alertMessage = action.payload
    },
  },
})

export const { setAppStatus, setAppAlertMessage } = appSlice.actions
export const appReducer = appSlice.reducer

// Types
type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading'
export type AlertMessageType = 'success' | 'error'
export type AppAlertMessageTextType = string | null
type SetAppMessagePayloadType = {
  messageType: AlertMessageType
  messageText: AppAlertMessageTextType
}
export type SetRequestStatusPayloadType = { status: RequestStatusType }
