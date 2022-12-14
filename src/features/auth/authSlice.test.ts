import { RequestStatusType } from '../../app/appSlice'

import { authReducer, AuthStateType } from './authSlice'

let initialState: AuthStateType

beforeEach(() => {
  initialState = {
    isLoggedIn: false,
    status: 'idle' as RequestStatusType,
  }
})

describe('Auth reducers', () => {
  test('should return the initial state', () => {
    expect(authReducer(initialState, { type: undefined })).toBe(initialState)
  })
})
