import { RequestStatusType } from '../../app/appSlice'

import { authReducer, AuthStateType, setAuthStatus, setIsLoggedInAC } from './authSlice'

describe('auth reducer tests', () => {
  let initialState: AuthStateType

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
      status: 'idle' as RequestStatusType,
    }
  })

  test('should return the initial state', () => {
    expect(authReducer(initialState, { type: undefined })).toBe(initialState)
  })

  test('should set isLoggedIn to true', () => {
    expect(authReducer(initialState, setIsLoggedInAC({ isLoggedIn: true })).isLoggedIn).toBeTruthy()
  })

  test('should set isLoggedIn to false', () => {
    initialState.isLoggedIn = true
    expect(authReducer(initialState, setIsLoggedInAC({ isLoggedIn: false })).isLoggedIn).toBeFalsy()
  })

  test('should set status to loading', () => {
    expect(authReducer(initialState, setAuthStatus({ status: 'loading' })).status).toBe('loading')
  })

  test('should set status to idle', () => {
    initialState.status = 'loading'
    expect(authReducer(initialState, setAuthStatus({ status: 'idle' })).status).toBe('idle')
  })
})
