import { combineReducers } from 'redux'

import { authReducer } from '../features/auth/authSlice'

import { appReducer } from './appSlice'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})
