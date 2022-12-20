import React from 'react'

import { Dispatch } from 'redux'

import { Pack, packsApi, ResponseType } from '../../services/packsApi'

const initialState: InitialStateType = {
  cardPacks: [],
  page: 0,
  pageCount: 0,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET-PACKS-DATA':
      return {
        cardPacks: action.payload.cardPacks,
        page: action.payload.page,
        pageCount: action.payload.pageCount,
        cardPacksTotalCount: action.payload.cardPacksTotalCount,
        minCardsCount: action.payload.minCardsCount,
        maxCardsCount: action.payload.maxCardsCount,
      }
    default:
      return state
  }
}

//actions
export const setPacks = (data: CardsData) =>
  ({ type: 'SET-PACKS-DATA', payload: { ...data } } as const)

//thunks

export const getAllPacks = () => async (dispatch: Dispatch) => {
  try {
    const response = await packsApi.getAllPacks()

    if (response.data.token) {
      const { cardPacks, page, pageCount, cardPacksTotalCount, minCardsCount, maxCardsCount } =
        response.data

      dispatch(
        setPacks({ cardPacks, page, pageCount, cardPacksTotalCount, minCardsCount, maxCardsCount })
      )
    }
  } catch (e) {
    console.log(e)
  }
}

//types
type InitialStateType = {
  cardPacks: Pack[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
}
type ActionType = ReturnType<typeof setPacks>
type CardsData = Pick<
  ResponseType,
  'cardPacks' | 'page' | 'pageCount' | 'cardPacksTotalCount' | 'minCardsCount' | 'maxCardsCount'
>
