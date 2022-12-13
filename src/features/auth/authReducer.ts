import { AxiosError } from 'axios'

import { AppDispatchType } from '../../app/store'
import { LoginParamsType } from '../../services/authApi'

const initialState = {
  isLoggedIn: true,
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_IS_LOGGED_IN': {
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    }
    default:
      return state
  }
}

// ACTIONS
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: 'auth/SET_IS_LOGGED_IN',
    payload: {
      isLoggedIn,
    },
  } as const
}

// THUNKS
export const logInTC = (data: LoginParamsType) => async (dispatch: AppDispatchType) => {
  try {
    ;() => alert(1) //plug
  } catch (e) {
    const error = e as Error | AxiosError
  }
}

export const logOutTC = () => async (dispatch: AppDispatchType) => {
  try {
    ;() => alert(1) //plug
  } catch (e) {
    const error = e as Error | AxiosError
  }
}

// TYPES
type InitialStateType = typeof initialState

type ActionsType = SetIsLoggedInACType

type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
