import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { RootStateType } from '../../app/store'
import { cardsAPI, CardsResponseType, GradeData } from '../../services/cardsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { logOutTC } from '../auth/authSlice'
import { getCardsTC } from '../cards/cardsSlice'

const initialState = {
  cardsData: {} as CardsResponseType,
  cardsTotalCount: 0,
  isInitialized: false,
}

export const getCards = createAsyncThunk(
  'learn/getCards',
  async (cardsPack_id: string, { dispatch, rejectWithValue, getState }) => {
    try {
      // const state = getState() as RootStateType
      // const totalCardsCount = state.learn.cardsTotalCount

      const responseAllCards = await cardsAPI.getCards({ cardsPack_id, pageCount: 10000 })

      return responseAllCards.data
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

export const gradeCard = createAsyncThunk(
  'learn/gradeCard',
  async (data: GradeData, { dispatch, rejectWithValue }) => {
    try {
      const response = await cardsAPI.gradeCard(data)

      return response.data.updatedGrade
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

export const learnSlice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    setInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getCardsTC.fulfilled, (state, action) => {
      state.cardsTotalCount = action.payload.cardsData.cardsTotalCount
    })

    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cardsData = action.payload
        state.isInitialized = true
      })
      .addCase(getCards.rejected, state => {
        state.isInitialized = true
      })

    builder.addCase(gradeCard.fulfilled, (state, action) => {
      state.cardsData.cards = state.cardsData.cards.filter(
        card => card._id !== action.payload.card_id
      )
    })

    builder.addCase(logOutTC.fulfilled, () => {
      return initialState
    })
  },
})

export const LearnReducer = learnSlice.reducer
export const { setInitialized } = learnSlice.actions
