import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppAlertMessage, setAppStatus } from '../app/appSlice'

export const handleServerNetworkError = (dispatch: Dispatch, error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    const err = error.response?.data
      ? (error.response.data as { error: 'string' }).error
      : error.message

    dispatch(setAppAlertMessage({ messageType: 'error', messageText: err }))
  }
  dispatch(setAppStatus('idle'))
}
