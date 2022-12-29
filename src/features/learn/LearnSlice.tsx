import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios/index'

import { AppDispatchType } from '../../app/store'
import { cardsAPI, GradeData, ServerCardType, upgradedCardType } from '../../services/cardsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'

const initialState: initialStateType = {
  cards: [],
}

export const learnSlice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<{ cards: ServerCardType[] }>) {
      state.cards = action.payload.cards
    },
    setGratedCard(state, action: PayloadAction<{ card: upgradedCardType }>) {
      state.cards = state.cards.map(card =>
        card._id === action.payload.card.card_id ? { ...card, ...action.payload.card } : card
      )
    },
  },
})

export const LearnReducer = learnSlice.reducer
export const { setCards, setGratedCard } = learnSlice.actions

// thunks

export const getCards = (data: { cardsPack_id: string }) => async (dispatch: AppDispatchType) => {
  try {
    const response = await cardsAPI.getCards({ cardsPack_id: data.cardsPack_id, pageCount: 100 })

    dispatch(setCards({ cards: response.data.cards }))
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
}

export const gradeCard = (data: GradeData) => async (dispatch: AppDispatchType) => {
  try {
    const response = await cardsAPI.gradeCard(data)

    dispatch(setGratedCard({ card: response.data.updatedGrade }))
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
}

type initialStateType = {
  cards: ServerCardType[] | []
}
