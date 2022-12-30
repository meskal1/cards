import { combineReducers } from 'redux'

import { authReducer } from '../features/auth/authSlice'
import { cardsReducer } from '../features/cards/cardsSlice'
import { LearnReducer } from '../features/learn/learnSlice'
import { packsReducer } from '../features/packs/packsSlice'
import { profileReducer } from '../features/profile/profileSlice'

import { appReducer } from './appSlice'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer,
  learn: LearnReducer,
})
