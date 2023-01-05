import { RequestStatusPayloadType } from '../../app/appSlice'
import { LoginParamsType } from '../../services/authApi'

import { authReducer, AuthStateType, logInTC, logOutTC } from './authSlice'

describe('auth reducer tests', () => {
  let initialState: AuthStateType

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
      recoveryEmail: '',
      status: 'idle' as RequestStatusPayloadType,
      passwordIsChanged: false,
    }
  })

  test('should return the initial state', () => {
    expect(authReducer(initialState, { type: undefined })).toBe(initialState)
  })

  test('should set isLoggedIn to true', () => {
    const data: LoginParamsType = { email: '', password: '', rememberMe: true }

    expect(
      authReducer(initialState, logInTC.fulfilled(undefined, '', data)).isLoggedIn
    ).toBeTruthy()
  })

  test('should set isLoggedIn to false', () => {
    initialState.isLoggedIn = true
    expect(authReducer(initialState, logOutTC.fulfilled(undefined, '')).isLoggedIn).toBeFalsy()
  })

  // test('should set status to loading', () => {
  //   expect(authReducer(initialState, setAuthStatus({ status: 'loading' })).status).toBe('loading')
  // })
  //
  // test('should set status to idle', () => {
  //   initialState.status = 'loading'
  //   expect(authReducer(initialState, setAuthStatus({ status: 'idle' })).status).toBe('idle')
  // })
})
