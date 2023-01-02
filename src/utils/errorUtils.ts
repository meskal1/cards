import axios, { AxiosError } from 'axios'

import { setAppAlertMessage, setAppStatus } from '../app/appSlice'
import { AppDispatchType } from '../app/store'
import { setIsLoggedIn } from '../features/auth/authSlice'

export const handleServerNetworkError = (dispatch: AppDispatchType, error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    const err = error.response?.data
      ? (error.response.data as { error: 'string' }).error
      : error.message

    dispatch(setAppAlertMessage({ messageType: 'error', messageText: err }))
  }
  dispatch(setAppStatus('idle'))
}
