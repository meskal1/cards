import axios, { AxiosError } from 'axios'

import { setAppAlertMessage, setAppStatusAC } from '../app/appSlice'
import { AppDispatchType } from '../app/store'

export const handleServerNetworkError = (dispatch: AppDispatchType, error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    const err = error.response?.data
      ? (error.response.data as { error: 'string' }).error
      : error.message

    dispatch(setAppAlertMessage({ messageType: 'error', messageText: err }))
  }
  dispatch(setAppStatusAC({ status: 'idle' }))
}

export const handleServerAppError = <D>(dispatch: AppDispatchType, data: boolean) => {
  //   if (data.messages.length) {
  //  dispatch(setAppErrorAC(data.messages[0]))
  //   } else {
  //  dispatch(setAppErrorAC('Some error occurred'))
  //   }
  //   dispatch(setAppStatusAC('failed'))
}
