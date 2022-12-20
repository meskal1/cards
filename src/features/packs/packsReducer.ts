import React from 'react'

const initialState: InitialStateType = {}

export const packsReducer = (state: InitialStateType = initialState, action: ActionType) => {
  switch (action.type) {
    default:
      return state
  }
}

//actions

//thunks

//types
type InitialStateType = {}
type ActionType = { type: string }
