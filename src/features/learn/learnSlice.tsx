import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios/index'

import { setAppStatus } from '../../app/appSlice'
import { AppDispatchType, RootStateType } from '../../app/store'
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
      state.cards = state.cards.filter(card => card._id !== action.payload.card.card_id)
    },
  },
})

export const LearnReducer = learnSlice.reducer
export const { setCards, setGratedCard } = learnSlice.actions

// thunks

export const getCards =
  (data: { cardsPack_id: string }) =>
  async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const response = await cardsAPI.getCards({ cardsPack_id: data.cardsPack_id })

      console.log(response.data)
      const responseAllCards = await cardsAPI.getCards({
        cardsPack_id: data.cardsPack_id,
        pageCount: response.data.cardsTotalCount,
      })

      dispatch(setCards({ cards: responseAllCards.data.cards }))
      dispatch(setAppStatus({ status: 'idle' }))
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
