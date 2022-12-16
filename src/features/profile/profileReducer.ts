import { AxiosError } from 'axios/index'
import { Dispatch } from 'redux'

import { setAppStatusAC } from '../../app/appSlice'
import { authAPI, editProfileType } from '../../services/authApi'
import { handleServerNetworkError } from '../../utils/errorUtils'

const initialState = {
  name: '',
  email: '',
  avatar: '',
}

export const profileReducer = (
  state: InitialProfileType = initialState,
  action: ActionType
): InitialProfileType => {
  switch (action.type) {
    case 'SET-PROFILE':
      return {
        name: action.payload.name,
        avatar: action.payload.avatar,
        email: action.payload.email,
      }
    default:
      return state
  }
}

//actions

export const setProfile = (profile: { name: string; email: string; avatar: string | undefined }) =>
  ({ type: 'SET-PROFILE', payload: profile } as const)

export const changeProfile = (profile: editProfileType) =>
  ({ type: 'EDIT-PROFILE', payload: { ...profile } } as const)

//thunks

export const editProfile = (profile: editProfileType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const response = await authAPI.editProfile(profile)

    if (response.data._id) {
      const { name, avatar } = response.data

      dispatch(changeProfile({ name: name, avatar: avatar }))
      dispatch(setAppStatusAC({ status: 'idle' }))
    }
  } catch (error) {
    handleServerNetworkError(dispatch, error as Error | AxiosError)
  }
}

// types

export type InitialProfileType = {
  name: string
  email: string
  avatar: string | undefined
}

type ActionType = ReturnType<typeof setProfile>
