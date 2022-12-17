import { RequestStatusType } from '../../app/appSlice'

import { authReducer, AuthStateType, setAuthStatus, setIsLoggedIn } from './authSlice'

describe('auth reducer tests', () => {
  let initialState: AuthStateType

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
      recoveryEmail: '',
      status: 'idle' as RequestStatusType,
      passwordIsChanged: false,
    }
  })

  test('should return the initial state', () => {
    expect(authReducer(initialState, { type: undefined })).toBe(initialState)
  })

  test('should set isLoggedIn to true', () => {
    expect(authReducer(initialState, setIsLoggedIn({ isLoggedIn: true })).isLoggedIn).toBeTruthy()
  })

  test('should set isLoggedIn to false', () => {
    initialState.isLoggedIn = true
    expect(authReducer(initialState, setIsLoggedIn({ isLoggedIn: false })).isLoggedIn).toBeFalsy()
  })

  test('should set status to loading', () => {
    expect(authReducer(initialState, setAuthStatus({ status: 'loading' })).status).toBe('loading')
  })

  test('should set status to idle', () => {
    initialState.status = 'loading'
    expect(authReducer(initialState, setAuthStatus({ status: 'idle' })).status).toBe('idle')
  })
})
