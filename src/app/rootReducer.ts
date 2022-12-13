import { combineReducers } from 'redux'

import { authReducer } from '../features/auth/authReducer'
// eslint-disable-next-line import/namespace
import { profileReducer } from '../features/profile/profileReducer'

export const rootReducer = combineReducers({
  isLoggedIn: authReducer,
  profile: profileReducer,
})
