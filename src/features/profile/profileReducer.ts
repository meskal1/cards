import React from 'react'

import { Dispatch } from 'redux'

import { authAPI } from '../../services/authApi'

const initialState = {
  name: '',
  email: '',
  avatar: '',

  isLoggedIn: false,
}

export const profileReducer = (
  state: InitialProfileType = initialState,
  action: ActionType
): InitialProfileType => {
  switch (action.type) {
    case 'AUTH-ME':
      return {
        ...state,
        name: action.payload.name,
        avatar: action.payload.avatar,
        email: action.payload.email,
        isLoggedIn: action.payload.isLoggedIn,
      }
    default:
      return state
  }
}

//actions

export const setAuthMe = (name: string, email: string, avatar: string, isLoggedIn: boolean) =>
  ({ type: 'AUTH-ME', payload: { name, email, avatar, isLoggedIn } } as const)

//thunks

export const authMe = () => async (dispatch: Dispatch) => {
  try {
    const me = await authAPI.me()

    if (me.data._id) {
      const { name, email, avatar } = me.data

      dispatch(setAuthMe(name, email, avatar, true))
    }
  } catch (e) {
    console.log(e)
  }
}

// types

export type InitialProfileType = {
  name: string
  email: string
  avatar: string
  isLoggedIn: boolean
}

type ActionType = ReturnType<typeof setAuthMe>
