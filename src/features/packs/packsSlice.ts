import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { boolean } from 'yup'

import { RequestStatusType, setTableStatus } from '../../app/appSlice'
import { RootStateType } from '../../app/store'
import { CreatePackType, packsAPI, ServerPackType } from '../../services/packsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { setCardsData } from '../cards/cardsSlice'

export const initialPacksQueryParams = {
  min: 0,
  max: 0,
  page: 1,
  pageCount: 8,
  sortPacks: '0updated' as SortValuesType,
  search: '',
  isMyPacks: '' as 'yes' | '',
}

const initialState = {
  queryParams: initialPacksQueryParams,
  cardsCount: {
    minCardsCount: 0,
    maxCardsCount: 0,
    cardPacksTotalCount: 0,
  },
  dataResetToggle: false,
  tableData: [] as AppPackType[],
}

export const getPacksTC = createAsyncThunk(
  'packs/getPacks',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(setTableStatus('loading'))
      const state = getState() as RootStateType
      const { isMyPacks, page, pageCount, search, sortPacks, min, max } = state.packs.queryParams
      const data = {
        packName: search,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        user_id: isMyPacks ? state.profile.userData.id : '',
        // block,
      }
      const response = await packsAPI.getPacks(data)
      const minCardsCount = response.data.minCardsCount
      const maxCardsCount = response.data.maxCardsCount
      const cardPacksTotalCount = response.data.cardPacksTotalCount

      return {
        tableData: response.data.cardPacks,
        cardsCount: { minCardsCount, maxCardsCount, cardPacksTotalCount },
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    } finally {
      dispatch(setTableStatus('idle'))
    }
  }
)

export const deletePackTC = createAsyncThunk(
  'packs/deletePack',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await packsAPI.deletePack(id)
      await dispatch(getPacksTC())
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue({ packId: id, requestStatus: 'idle' })
    }
  }
)

export const addPackTC = createAsyncThunk(
  'packs/addPack',
  async (data: CreatePackType, { dispatch }) => {
    try {
      await packsAPI.addPack(data)
      await dispatch(getPacksTC())
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }
)

export const updatePackTC = createAsyncThunk(
  'packs/updatePack',
  async (data: UpdatePackDataType, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootStateType
      const updateCardsData = state.cards.cardsData

      await packsAPI.updatePack({ _id: data.id, name: data.name, deckCover: data.deckCover })
      await dispatch(getPacksTC())
      dispatch(setCardsData({ ...updateCardsData, packName: data.name }))
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(data.id)
    }
  }
)

const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacksQueryParams(state, action: PayloadAction<PacksQueryParamsType>) {
      state.queryParams = { ...state.queryParams, ...action.payload }
    },
    setPackRequestStatus(state, action: PayloadAction<PackRequestStatusPayloadType>) {
      state.tableData.forEach(p => {
        if (p._id === action.payload.packId) {
          p.requestStatus = action.payload.requestStatus
        }
      })
    },
    clearPacksQueryParams(state) {
      state.queryParams = initialState.queryParams
    },
    toggleResetData(state) {
      state.dataResetToggle = !state.dataResetToggle
    },
  },
  extraReducers: builder => {
    builder.addCase(getPacksTC.fulfilled, (state, action) => {
      state.tableData = action.payload.tableData.map(p => ({ ...p, requestStatus: 'idle' }))
      state.cardsCount = { ...action.payload.cardsCount }
    })

    builder
      .addCase(deletePackTC.pending, (state, action) => {
        state.tableData.forEach(p =>
          p._id === action.meta.arg ? (p.requestStatus = 'loading') : ''
        )
      })
      .addCase(deletePackTC.rejected, (state, action) => {
        state.tableData.forEach(p => (p._id === action.meta.arg ? (p.requestStatus = 'idle') : ''))
      })

    builder
      .addCase(updatePackTC.pending, (state, action) => {
        state.tableData.forEach(p =>
          p._id === action.meta.arg.id ? (p.requestStatus = 'loading') : ''
        )
      })
      .addCase(updatePackTC.rejected, (state, action) => {
        state.tableData.forEach(p => (p._id === action.payload ? (p.requestStatus = 'idle') : ''))
      })
  },
})

export const packsReducer = packsSlice.reducer

// ACTIONS
export const { setPacksQueryParams, setPackRequestStatus, clearPacksQueryParams, toggleResetData } =
  packsSlice.actions

// TYPES
export type PacksStateType = typeof initialState
export type AppPackType = ServerPackType & { requestStatus: RequestStatusType }

export type SortValuesType =
  | '0cardsCount'
  | '1cardsCount'
  | '0updated'
  | '1updated'
  | '0name'
  | '1name'
  | '0user_name'
  | '1user_name'

type PackRequestStatusPayloadType = {
  packId: string
  requestStatus: RequestStatusType
}

type SetPacksQueryParamsPayloadType = {
  min: number
  max: number
  page: number
  pageCount: number
  sortPacks: SortValuesType
  search: string
  isMyPacks: 'yes' | ''
}

export type PacksQueryParamsType = Partial<SetPacksQueryParamsPayloadType>

export type UpdatePackDataType = {
  id: string
  name: string
  deckCover: string
}
