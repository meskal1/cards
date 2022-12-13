import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as AppErrorType,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<SetRequestStatusPayloadType>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<SetAppErrorPayloadType>) {
      state.error = action.payload.error
    },
  },
})

export const { setAppStatus, setAppError } = appSlice.actions
export const appReducer = appSlice.reducer

// Types
type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading'
export type AppErrorType = string | null
export type SetRequestStatusPayloadType = { status: RequestStatusType }
type SetAppErrorPayloadType = { error: AppErrorType }
