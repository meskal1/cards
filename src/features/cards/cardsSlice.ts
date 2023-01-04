import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { RequestStatusPayloadType, setAppStatus, setTableStatus } from '../../app/appSlice'
import { AppDispatchType, RootStateType } from '../../app/store'
import { cardsAPI, ServerCardType, CreateCardType } from '../../services/cardsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'

const initialState = {
  queryParams: {
    min: 0,
    max: 0,
    page: 1,
    pageCount: 8,
    sortCards: '0grade' as SortValuesCardsType,
    cardsPack_id: '',
    cardQuestion: '',
    cardAnswer: '',
  },
  cardsData: {
    packName: '',
    packUserId: '',
    cardsTotalCount: 0,
  },
  tableData: [] as AppCardType[],
  error: null as CardsErrorType,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsQueryParams(state, action: PayloadAction<CardsQueryParamsType>) {
      state.queryParams = { ...state.queryParams, ...action.payload }
    },
    setCardsTableData(state, action: PayloadAction<CardsTablePayloadType>) {
      state.tableData = action.payload.map(c => ({ ...c, requestStatus: 'idle' }))
    },
    setCardsData(state, action: PayloadAction<SetCardsDataPayloadType>) {
      state.cardsData = action.payload
    },
    setError(state, action: PayloadAction<CardsErrorPayloadType>) {
      state.error = action.payload.error
    },
    setCardRequestStatus(state, action: PayloadAction<CardRequestStatusPayloadType>) {
      state.tableData.forEach(c => {
        if (c._id === action.payload.cardId) {
          c.requestStatus = action.payload.requestStatus
        }
      })
    },
    clearCardsQueryParams(state) {
      state.queryParams = initialState.queryParams
    },
    clearCardsState() {
      return initialState
    },
  },
})

export const cardsReducer = cardsSlice.reducer

// ACTIONS
export const {
  setCardsQueryParams,
  setCardsTableData,
  setError,
  clearCardsState,
  setCardRequestStatus,
  setCardsData,
  clearCardsQueryParams,
} = cardsSlice.actions

// THUNKS
export const updateCardsQueryParamsTC =
  (queryProps: CardsQueryParamsType) =>
  async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    dispatch(setTableStatus('loading'))
    try {
      const { page, pageCount } = queryProps
      const queryParams = getState().cards.queryParams

      dispatch(
        setCardsQueryParams({
          ...queryProps,
          page: page || page === 0 ? +page : queryParams.page,
          pageCount: pageCount || pageCount === 0 ? +pageCount : queryParams.pageCount,
        })
      )
      await dispatch(getCardsTC())

      return
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    } finally {
      dispatch(setTableStatus('idle'))
    }
  }

export const getCardsTC =
  () => async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      const data = getState().cards.queryParams
      const response = await cardsAPI.getCards(data)
      const packUserId = response.data.packUserId
      const packName = response.data.packName
      const cardsTotalCount = response.data.cardsTotalCount

      dispatch(setCardsData({ packName, packUserId, cardsTotalCount }))
      dispatch(setCardsTableData(response.data.cards))
    } catch (e) {
      // Подумать можно ли это вынести в handleServerNetworkError
      if (axios.isAxiosError<{ in: string; error: string }>(e)) {
        if (
          e.response?.data.in === 'getCards/CardsPack.findById' ||
          e.response?.data.error === 'CardsPack id not valid /ᐠ-ꞈ-ᐟ\\'
        ) {
          dispatch(setError({ error: 'WRONG_ID' }))

          return
        }
      }
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }

export const deleteCardTC = (id: string) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatus('loading'))
    dispatch(setCardRequestStatus({ cardId: id, requestStatus: 'loading' }))
    await cardsAPI.deleteCard(id)
    await dispatch(getCardsTC())
  } catch (e) {
    dispatch(setCardRequestStatus({ cardId: id, requestStatus: 'idle' }))
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  } finally {
    dispatch(setAppStatus('idle'))
  }
}

export const addCardTC = (data: CreateCardType) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatus('loading'))
    dispatch(setTableStatus('loading'))
    await cardsAPI.addCard(data)
    await dispatch(getCardsTC())
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  } finally {
    dispatch(setAppStatus('idle'))
    dispatch(setTableStatus('idle'))
  }
}

export const updateCardTC =
  (data: UpdateCardType) => async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      dispatch(setAppStatus('loading'))
      dispatch(setCardRequestStatus({ cardId: data.id, requestStatus: 'loading' }))
      const updatingCard = getState().cards.tableData.filter(card => data.id === card._id)

      await cardsAPI.updateCard({
        ...updatingCard[0],
        question: data.question,
        answer: data.answer,
      })
      await dispatch(getCardsTC())
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    } finally {
      dispatch(setAppStatus('idle'))
      dispatch(setCardRequestStatus({ cardId: data.id, requestStatus: 'idle' }))
    }
  }

// TYPES
export type CardsStateType = typeof initialState
export type AppCardType = ServerCardType & { requestStatus: RequestStatusPayloadType }

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

type SetCardsQueryParamsPayloadType = {
  min: number
  max: number
  page: number
  pageCount: number
  sortCards: SortValuesCardsType
  cardsPack_id: string
  cardQuestion: string
  cardAnswer: string
}

type CardsQueryParamsType = Partial<SetCardsQueryParamsPayloadType>

type CardRequestStatusPayloadType = {
  cardId: string
  requestStatus: RequestStatusPayloadType
}

type SetCardsDataPayloadType = {
  packName: string
  packUserId: string
  cardsTotalCount: number
}

type CardsTablePayloadType = ServerCardType[]

export type UpdateCardType = {
  id: string
  question: string
  answer: string
}

type CardsErrorPayloadType = {
  error: CardsErrorType
}
