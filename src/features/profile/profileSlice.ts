import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  userData: {
    name: '',
    email: '',
    avatar: '',
  } as UserDataType,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserData(
      state,
      action: PayloadAction<{
        userData: UserDataType
      }>
    ) {
      state.userData = action.payload.userData
    },
  },
})

export const { setUserData } = profileSlice.actions
export const profileReducer = profileSlice.reducer

// TYPES
export type UserDataType = {
  name: string
  email: string
  avatar: string | undefined
}
