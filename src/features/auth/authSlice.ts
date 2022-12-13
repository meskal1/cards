import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import {
  RequestStatusType,
  setAppAlertMessage,
  SetRequestStatusPayloadType,
} from '../../app/appSlice'
import { authAPI, RegisterFailResponseType, RegisterParamsType } from '../../services/authApi'

const initialState = {
  isLoggedIn: false,
  status: 'idle' as RequestStatusType,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<SetRequestStatusPayloadType>) {
      state.status = action.payload.status
    },
  },
})

// Thunks
export const registerTC = (data: RegisterParamsType) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAuthStatus({ status: 'loading' }))
    const res = await authAPI.register(data)

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

export const { setAuthStatus } = authSlice.actions
export const authReducer = authSlice.reducer

// Types
type InitialStateType = typeof initialState
