import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setIsLoggedInAC } from '../features/auth/authSlice'
import { authAPI } from '../services/authApi'

import { AppDispatchType } from './store'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: '',
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error
    },
    setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer

// ACTIONS
export const { setAppStatusAC, setAppErrorAC, setIsInitializedAC } = slice.actions

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
      const error = e as Error | AxiosError

      navigateToLogin()
    } finally {
      setIsAppLoaded()
    }
  }

// TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
