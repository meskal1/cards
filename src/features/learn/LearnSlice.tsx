import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatchType } from '../../app/store'
import { cardsAPI, ServerCardType } from '../../services/cardsApi'

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
  },
})

export const LearnReducer = learnSlice.reducer
export const { setCards } = learnSlice.actions

// thunks

export const getCards = (data: { cardsPack_id: string }) => async (dispatch: AppDispatchType) => {
  try {
    const response = await cardsAPI.getCards({ cardsPack_id: data.cardsPack_id, pageCount: 100 })

    dispatch(setCards({ cards: response.data.cards }))
    console.log(response.data.cards)
  } catch (e) {
    console.log(e)
  }
}

type initialStateType = {
  cards: ServerCardType[] | []
}
