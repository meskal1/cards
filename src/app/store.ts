import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

//@ts-ignore
window.store = store
