import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios/index'

import { AppDispatchType, RootStateType } from '../../app/store'
import { cardsAPI, GradeData, ServerCardType, upgradedCardType } from '../../services/cardsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { setCardsData } from '../cards/cardsSlice'

const initialState = {
  cards: [] as ServerCardType[],
  cardsTotalCount: 0,
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
  extraReducers: builder => {
    builder.addCase(setCardsData, (state, action: PayloadAction<{ cardsTotalCount: number }>) => {
      state.cardsTotalCount = action.payload.cardsTotalCount
    })
  },
})

export const LearnReducer = learnSlice.reducer
export const { setCards, setGratedCard } = learnSlice.actions

// thunks

export const getCards =
  (data: { cardsPack_id: string }) =>
  async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      const totalCardsCount = getState().learn.cardsTotalCount
      const responseAllCards = await cardsAPI.getCards({
        cardsPack_id: data.cardsPack_id,
        pageCount: totalCardsCount,
      })

      dispatch(setCards({ cards: responseAllCards.data.cards }))
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
