import { combineReducers } from 'redux'

import { authReducer } from '../features/auth/authSlice'
import { packsReducer } from '../features/packs/packsReducer'
import { profileReducer } from '../features/profile/profileSlice'

import { appReducer } from './appSlice'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  packs: packsReducer,
})
