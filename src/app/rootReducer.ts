import { authReducer } from '../features/auth/authReducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  isLoggedIn: authReducer,
})
