import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { RequestStatusType } from '../../app/appSlice'
import { RootStateType } from '../../app/store'
import {
  CreatePackType,
  packsAPI,
  PacksResponseType,
  ServerPackType,
} from '../../services/packsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { logOutTC } from '../auth/authSlice'
import { setCardsData } from '../cards/cardsSlice'

export const initialPacksQueryParams = {
  min: 0,
  max: 0,
  page: 1,
  pageCount: 8,
  sortPacks: '0updated' as PacksSortValuesType,
  search: '',
  isMyPacks: '' as 'yes' | '',
}

const intialPacksData = {
  minCardsCount: 0,
  maxCardsCount: 0,
  cardPacksTotalCount: 0,
}

const initialState = {
  queryParams: initialPacksQueryParams,
  packsData: intialPacksData as PacksDataPayloadType,
  tableData: [] as AppPackType[],
  status: 'idle' as RequestStatusType,
}

export const getPacksTC = createAsyncThunk(
  'packs/getPacks',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
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
      const { cardPacks, ...restData } = response.data

      return {
        tableData: cardPacks,
        packsData: { ...restData },
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

export const deletePackTC = createAsyncThunk(
  'packs/deletePack',
  async (id: string, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootStateType
      const tableLength = state.packs.tableData.length
      const page = state.packs.queryParams.page

      await packsAPI.deletePack(id)

      if (tableLength === 1 && page > 1) {
        dispatch(setPacksQueryParams({ page: page - 1 }))
      } else {
        await dispatch(getPacksTC())
      }
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
      const { id, ...restData } = data
      const state = getState() as RootStateType
      const updateCardsData = state.cards.cardsData

      await packsAPI.updatePack({ _id: id, ...restData })
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
      Object.assign(state.queryParams, action.payload)
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
  },

  extraReducers: builder => {
    builder
      .addCase(getPacksTC.pending, state => {
        state.status = 'loading'
      })
      .addCase(getPacksTC.fulfilled, (state, action) => {
        state.tableData = action.payload.tableData.map(p => ({ ...p, requestStatus: 'idle' }))
        state.packsData = { ...action.payload.packsData }
        state.status = 'idle'
      })
      .addCase(getPacksTC.rejected, state => {
        state.status = 'idle'
      })

    builder
      .addCase(deletePackTC.pending, (state, action) => {
        state.status = 'loading'
        state.tableData.forEach(p =>
          p._id === action.meta.arg ? (p.requestStatus = 'loading') : ''
        )
      })
      .addCase(deletePackTC.fulfilled, state => {
        state.status = 'idle'
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

    builder.addCase(logOutTC.fulfilled, () => {
      return initialState
    })
  },
})

export const packsReducer = packsSlice.reducer

// ACTIONS
export const { setPacksQueryParams, clearPacksQueryParams } = packsSlice.actions

// TYPES
export type PacksStateType = typeof initialState

export type AppPackType = ServerPackType & { requestStatus: RequestStatusType }

export type PacksSortValuesType =
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
  sortPacks: PacksSortValuesType
  search: string
  isMyPacks: 'yes' | ''
}

type PacksDataPayloadType = Omit<PacksResponseType, 'cardPacks'>

export type PacksQueryParamsType = Partial<SetPacksQueryParamsPayloadType>

export type UpdatePackDataType = {
  id: string
  name: string
  private: boolean
  deckCover?: string
}
