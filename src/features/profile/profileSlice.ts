import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI } from '../../services/authApi'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { logOutTC } from '../auth/authSlice'

const initialState = {
  userData: {
    id: '',
    name: '',
    email: '',
    avatar: undefined,
  } as UserDataType,
}

export const updateUserDataTC = createAsyncThunk(
  'profile/updateUserData',
  async (data: UserDataType, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.newUserData(data)
      const { _id, name, email, avatar } = response.data.updatedUser

      return { id: _id, name, email, avatar }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserDataType>) {
      state.userData = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUserDataTC.fulfilled, (state, action) => {
      state.userData = action.payload
    })

    builder.addCase(logOutTC.fulfilled, () => {
      return initialState
    })
  },
})

export const profileReducer = profileSlice.reducer

// ACTIONS
export const { setUserData } = profileSlice.actions

// TYPES
export type ProfileStateType = typeof initialState

export type UserDataType = {
  id?: string
  name?: string
  email?: string
  avatar?: string | undefined
}
