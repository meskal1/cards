import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { AppDispatchType, RootStateType } from '../../app/store'
import { cardsAPI, CardType, CreateCardType } from '../../services/cardsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { clearPacksTableData } from '../packs/packsSlice'

const initialState = {
  queryParams: {
    min: 0,
    max: 10,
    page: 1,
    pageCount: 10,
    sortCards: '0grade' as SortValuesCardsType,
    cardsPack_id: '',
    cardQuestion: '',
    cardAnswer: '',
  },
  tableData: [] as CardType[],
  error: null as CardsErrorType,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setSearchCards(state, action: PayloadAction<SearchCardsPayloadType>) {
      state.queryParams.cardQuestion = action.payload.cardQuestion

      if (action.payload.cardAnswer) {
        state.queryParams.cardAnswer = action.payload.cardAnswer
      }
    },
    setCardsTableData(state, action: PayloadAction<CardsTablePayloadType>) {
      state.tableData = action.payload
    },
    setCardsPackId(state, action: PayloadAction<CardsPackIdPayloadType>) {
      state.queryParams.cardsPack_id = action.payload.cardsPack_id
    },
    setPaginationCardsData(state, action: PayloadAction<PaginationCardsDataPayloadType>) {
      state.queryParams.page = action.payload.page
      state.queryParams.pageCount = action.payload.pageCount
    },
    setSortValue(state, action: PayloadAction<SortCardsPayloadType>) {
      state.queryParams.sortCards = action.payload.sortCards
    },
    setError(state, action: PayloadAction<CardsErrorPayloadType>) {
      state.error = action.payload.error
    },
    clearCardsTableData(state) {
      state.tableData = []
    },
    clearCardsState() {
      return initialState
    },
  },
})

export const cardsReducer = cardsSlice.reducer

// ACTIONS
export const {
  setSearchCards,
  setCardsTableData,
  setCardsPackId,
  setPaginationCardsData,
  setSortValue,
  setError,
  clearCardsTableData,
  clearCardsState,
} = cardsSlice.actions

// THUNKS
export const getCardsTC =
  () => async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      const { min, max, page, pageCount, sortCards, cardsPack_id, cardQuestion, cardAnswer } =
        getState().cards.queryParams
      const data = {
        min,
        max,
        page,
        pageCount,
        sortCards,
        cardsPack_id,
        cardQuestion,
        cardAnswer,
      }

      const response = await cardsAPI.getCards(data)

      dispatch(clearCardsTableData())
      dispatch(setCardsTableData(response.data.cards))
    } catch (e) {
      // Подумать можно ли это вынести в handleServerNetworkError
      if (axios.isAxiosError<{ in: string }>(e)) {
        if (e.response?.data.in === 'getCards/CardsPack.findById') {
          dispatch(setError({ error: 'WRONG_ID' }))

          return
        }
      }

      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }

export const deleteCardTC = (id: string) => async (dispatch: AppDispatchType) => {
  try {
    await cardsAPI.deleteCard(id)
    dispatch(clearCardsTableData())
    dispatch(getCardsTC())
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
}

export const addCardTC = (data: CreateCardType) => async (dispatch: AppDispatchType) => {
  try {
    await cardsAPI.addCard(data)
    dispatch(clearCardsTableData())
    dispatch(getCardsTC())
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
}

export const updateCardTC =
  (data: UpdateCardType) => async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      const updatingCard = getState().cards.tableData.filter(card => data.id === card._id)

      await cardsAPI.updateCard({
        ...updatingCard[0],
        question: data.question,
        answer: data.answer,
      })
      dispatch(clearCardsTableData())
      dispatch(getCardsTC())
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }

// TYPES
export type CardsStateType = typeof initialState

export type SortValuesCardsType =
  | '0grade'
  | '1grade'
  | '0updated'
  | '1updated'
  | '0answer'
  | '1answer'
  | '0question'
  | '1question'

export type CardsErrorType = 'WRONG_ID' | null

type SortCardsPayloadType = { sortCards: SortValuesCardsType }

type CardsTablePayloadType = CardType[]

type SearchCardsPayloadType = { cardQuestion: string; cardAnswer?: string }

type PaginationCardsDataPayloadType = { page: number; pageCount: number }

type CardsPackIdPayloadType = { cardsPack_id: string }

export type UpdateCardType = {
  id: string
  question: string
  answer: string
}

type CardsErrorPayloadType = {
  error: CardsErrorType
}

//////////////////// REQUEST/RESPONSE TYPES ////////////////////////

// export type CardType = {
//   _id: string
//   cardsPack_id: string
//   user_id: string
//   answer: string
//   question: string
//   grade: number
//   shots: number
//   comments: string
//   type: string
//   rating: number
//   more_id: string
//   created: string
//   updated: string
//   __v: number
// }

// type CardResponseType = {
//   cards: CardType[]
//   packUserId: string
//   packName: string
//   packPrivate: boolean
//   packDeckCover: string
//   packCreated: string
//   packUpdated: string
//   page: number
//   pageCount: number
//   cardsTotalCount: number
//   minGrade: number
//   maxGrade: number
//   token: string
//   tokenDeathTime: number
// }

// type CreateCardType = {
//   cardsPack_id: string
//   question: string
//   answer: string
//   grade?: number
//   shots?: number
//   answerImg?: string
//   questionImg?: string
//   questionVideo?: string
//   answerVideo?: string
// }
