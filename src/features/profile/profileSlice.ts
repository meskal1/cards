import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { AppDispatchType } from '../../app/store'
import { authAPI } from '../../services/authApi'
import { handleServerNetworkError } from '../../utils/errorUtils'

const initialState = {
  userData: {
    id: '',
    name: '',
    email: '',
    avatar: undefined,
  } as UserDataType,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<{ userData: UserDataType }>) {
      state.userData = action.payload.userData
    },
  },
})

export const profileReducer = profileSlice.reducer

// ACTIONS
export const { setUserData } = profileSlice.actions

// THUNKS
export const newUserDataTC = (data: UserDataType) => async (dispatch: AppDispatchType) => {
  try {
    const response = await authAPI.newUserData(data)
    const { name, email, avatar } = response.data.updatedUser

    dispatch(setUserData({ userData: { name, email, avatar } }))
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
}

// TYPES
export type ProfileStateType = typeof initialState

export type UserDataType = {
  id?: string
  name?: string
  email?: string
  avatar?: string | undefined
}
