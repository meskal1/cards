import { createSlice, Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'

import { authAPI, RegisterFailResponseType, RegisterParamsType } from '../../services/authApi'

const initialState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

// Thunks
export const registerTC = (data: RegisterParamsType) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.register(data)

    return true
  } catch (e) {
    if (axios.isAxiosError<RegisterFailResponseType>(e)) {
      const error = e.response ? e.response.data.error : 'Some error'

      alert(error)
    }
  }
}
