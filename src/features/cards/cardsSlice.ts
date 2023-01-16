import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { RequestStatusType } from '../../app/appSlice'
import { RootStateType } from '../../app/store'
import { cardsAPI, CreateCardType, ServerCardType } from '../../services/cardsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { logOutTC } from '../auth/authSlice'

export const initialCardsQueryParams = {
  min: 0,
  max: 0,
  page: 1,
  pageCount: 8,
  sortCards: '0grade' as CardsSortValuesType,
  cardQuestion: '',
}

const initialState = {
  queryParams: { ...initialCardsQueryParams, cardsPack_id: '', cardAnswer: '' },
  cardsData: {
    packName: '',
    packUserId: '',
    cardsTotalCount: 0,
    packDeckCover: null as string | null,
  },
  tableData: [] as AppCardType[],
  error: null as CardsErrorType,
  status: 'loading' as RequestStatusType,
}

export const getCardsTC = createAsyncThunk(
  'cards/getCards',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootStateType
      const data = state.cards.queryParams
      const response = await cardsAPI.getCards(data)
      const packUserId = response.data.packUserId
      const packName = response.data.packName
      const cardsTotalCount = response.data.cardsTotalCount
      const packDeckCover = response.data.packDeckCover

      return {
        cardsData: { packName, packUserId, cardsTotalCount, packDeckCover },
        cardsTableData: response.data.cards,
      }
    } catch (e) {
      // Подумать можно ли это вынести в handleServerNetworkError
      if (axios.isAxiosError<{ in: string; error: string }>(e)) {
        if (
          e.response?.data.in === 'getCards/CardsPack.findById' ||
          e.response?.data.error === 'CardsPack id not valid /ᐠ-ꞈ-ᐟ\\'
        ) {
          dispatch(setError({ error: 'WRONG_ID' }))

          return rejectWithValue(null)
        }
      }
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

export const deleteCardTC = createAsyncThunk(
  'cards/deleteCard',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await cardsAPI.deleteCard(id)
      await dispatch(getCardsTC())
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(id)
    }
  }
)

export const addCardTC = createAsyncThunk(
  'cards/addCard',
  async (data: CreateCardType, { dispatch }) => {
    try {
      await cardsAPI.addCard(data)
      await dispatch(getCardsTC())
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }
)

export const updateCardTC = createAsyncThunk(
  'cards/updateCard',
  async (data: UpdateCardType, { dispatch, rejectWithValue }) => {
    try {
      const { id, ...restData } = data

      await cardsAPI.updateCard({ _id: id, ...restData })
      await dispatch(getCardsTC())
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsQueryParams(state, action: PayloadAction<CardsQueryParamsType>) {
      state.queryParams = { ...state.queryParams, ...action.payload }
    },
    setCardsData(state, action: PayloadAction<SetCardsDataPayloadType>) {
      state.cardsData = action.payload
    },
    setError(state, action: PayloadAction<CardsErrorPayloadType>) {
      state.error = action.payload.error
    },
    clearCardsQueryParams(state) {
      state.queryParams = initialState.queryParams
    },
    clearCardsState() {
      return initialState
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCardsTC.pending, state => {
        state.status = 'loading'
      })
      .addCase(getCardsTC.fulfilled, (state, action) => {
        state.cardsData = action.payload.cardsData
        state.tableData = action.payload.cardsTableData.map(c => ({ ...c, requestStatus: 'idle' }))
        state.status = 'idle'
      })
      .addCase(getCardsTC.rejected, state => {
        state.status = 'idle'
      })

    builder
      .addCase(deleteCardTC.pending, (state, action) => {
        state.tableData.forEach(c =>
          c._id === action.meta.arg ? (c.requestStatus = 'loading') : null
        )
      })
      .addCase(deleteCardTC.rejected, (state, action) => {
        state.tableData.forEach(c => (c._id === action.payload ? (c.requestStatus = 'idle') : null))
      })

    builder
      .addCase(updateCardTC.pending, (state, action) => {
        state.tableData.forEach(c =>
          c._id === action.meta.arg.id ? (c.requestStatus = 'loading') : null
        )
      })
      .addCase(updateCardTC.fulfilled, (state, action) => {
        state.tableData.forEach(c =>
          c._id === action.meta.arg.id ? (c.requestStatus = 'idle') : null
        )
      })
      .addCase(updateCardTC.rejected, (state, action) => {
        state.tableData.forEach(c => (c._id === action.payload ? (c.requestStatus = 'idle') : null))
      })

    builder.addCase(logOutTC.fulfilled, () => {
      return initialState
    })
  },
})

export const cardsReducer = cardsSlice.reducer

// ACTIONS
export const {
  setCardsQueryParams,
  setError,
  clearCardsState,
  setCardsData,
  clearCardsQueryParams,
} = cardsSlice.actions

// TYPES
export type CardsStateType = typeof initialState
export type AppCardType = ServerCardType & { requestStatus: RequestStatusType }

export type CardsSortValuesType =
  | '0grade'
  | '1grade'
  | '0updated'
  | '1updated'
  | '0answer'
  | '1answer'
  | '0question'
  | '1question'

export type CardsErrorType = 'WRONG_ID' | null

type SetCardsQueryParamsPayloadType = {
  min: number
  max: number
  page: number
  pageCount: number
  sortCards: CardsSortValuesType
  cardsPack_id: string
  cardQuestion: string
  cardAnswer: string
}

export type CardsQueryParamsType = Partial<SetCardsQueryParamsPayloadType>

type SetCardsDataPayloadType = {
  packName: string
  packUserId: string
  cardsTotalCount: number
  packDeckCover: string | null
}

export type UpdateCardType = {
  id: string
  question?: string
  answer: string
  questionImg?: string
}

type CardsErrorPayloadType = {
  error: CardsErrorType
}
