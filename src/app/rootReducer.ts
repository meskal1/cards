import { combineReducers } from 'redux'

import { authReducer } from '../features/auth/authReducer'

export const rootReducer = combineReducers({
  isLoggedIn: authReducer,
})
