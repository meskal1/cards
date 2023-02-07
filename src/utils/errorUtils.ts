import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppAlertMessage, setAppStatus } from '../app/appSlice'
import { setIsLoggedIn } from '../features/auth/authSlice'
import { setError } from '../features/cards/cardsSlice'
import { authAPI } from '../services/authApi'

export const handleServerNetworkError = async (dispatch: Dispatch, error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      const is401Fake = await checkFake401Error()

      if (is401Fake) {
        return
      }

      dispatch(setIsLoggedIn({ isLoggedIn: false }))
    }
    let err = error.response?.data
      ? (error.response.data as { error: 'string' }).error
      : error.message

    if (
      error.response?.data.in === 'getCards/CardsPack.findById' ||
      error.response?.data.error === 'CardsPack id not valid /ᐠ-ꞈ-ᐟ\\'
    ) {
      dispatch(setError({ error: 'WRONG_ID' }))
      err = 'CardsPack id is not valid'
    }

    dispatch(setAppAlertMessage({ messageType: 'error', messageText: err }))
  }
  dispatch(setAppStatus('idle'))
}

const checkFake401Error = async () => {
  return await new Promise(resolve => {
    setTimeout(async () => {
      try {
        await authAPI.me()
        resolve(true)
      } catch (e) {
        resolve(false)
      }
    }, 1000)
  })
}
