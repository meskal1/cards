import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setAppStatusAC, setIsInitializedAC } from '../../app/appSlice'
import { AppDispatchType } from '../../app/store'
import { LoginParamsType, authAPI } from '../../services/authApi'
import { handleServerNetworkError } from '../../utils/errorUtils'

const initialState = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer

// ACTIONS
export const { setIsLoggedInAC } = slice.actions

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
