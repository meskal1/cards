import { combineReducers } from 'redux'

import { authReducer } from '../features/auth/authSlice'
import { profileReducer } from '../features/profile/profileReducer'

import { appReducer } from './appSlice'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
})
