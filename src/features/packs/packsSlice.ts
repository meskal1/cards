import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { AppDispatchType, RootStateType } from '../../app/store'
import { CreatePackType, packsAPI, PackType, QueryPackParamsType } from '../../services/packsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'

const initialState = {
  queryParams: {
    min: 0,
    max: 10,
    page: 1,
    pageCount: 10,
    sortPacks: '0updated' as SortValuesType,
    search: '',
    isMyPacks: false,
  },
  tableData: [] as PackType[],
}

const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setSearchPacks(state, action: PayloadAction<SearchPacksPayloadType>) {
      state.queryParams.search = action.payload.search
    },
    setIsMyPacks(state, action: PayloadAction<IsMyPacksPayloadType>) {
      state.queryParams.isMyPacks = action.payload.isMyPacks
    },
    setPacksTableData(state, action: PayloadAction<PacksTablePayloadType>) {
      state.tableData = action.payload
    },
    setRangeCards(state, action: PayloadAction<RangeCardsPayloadType>) {
      state.queryParams.min = action.payload.min
      state.queryParams.max = action.payload.max
    },
    setPaginationPacksData(state, action: PayloadAction<PaginationPacksDataPayloadType>) {
      state.queryParams.page = action.payload.page
      state.queryParams.pageCount = action.payload.pageCount
    },
    setSortValue(state, action: PayloadAction<SortPacksPayloadType>) {
      state.queryParams.sortPacks = action.payload.sortPacks
    },
    clearPacksTableData(state) {
      state.tableData = []
    },
  },
})

export const packsReducer = packsSlice.reducer

// ACTIONS
export const {
  setSearchPacks,
  setIsMyPacks,
  setPacksTableData,
  setRangeCards,
  setPaginationPacksData,
  setSortValue,
  clearPacksTableData,
} = packsSlice.actions

// THUNKS
export const getPacksTC =
  () => async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      const { isMyPacks, page, pageCount, search, sortPacks, min, max } =
        getState().packs.queryParams
      const data = {
        packName: search,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        user_id: isMyPacks ? getState().profile.userData.id : '',
        // block,
      }

      const response = await packsAPI.getPacks(data)

      dispatch(clearPacksTableData())
      dispatch(setPacksTableData(response.data.cardPacks))
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }

export const deletePackTC = (id: string) => async (dispatch: AppDispatchType) => {
  try {
    await packsAPI.deletePack(id)
    dispatch(clearPacksTableData())
    dispatch(getPacksTC())
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
}

export const addPackTC = (data: CreatePackType) => async (dispatch: AppDispatchType) => {
  try {
    await packsAPI.addPack(data)
    dispatch(clearPacksTableData())
    dispatch(getPacksTC())
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
}

export const updatePackTC =
  (data: UpdatePackDataType) =>
  async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      const updatingPack = getState().packs.tableData.filter(pack => data.id === pack._id)

      await packsAPI.updatePack({ ...updatingPack[0], name: data.name })
      dispatch(clearPacksTableData())
      dispatch(getPacksTC())
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }

// TYPES
export type PacksStateType = typeof initialState

export type SortValuesType =
  | '0cardsCount'
  | '1cardsCount'
  | '0updated'
  | '1updated'
  | '0name'
  | '1name'
  | '0user_name'
  | '1user_name'

type SortPacksPayloadType = { sortPacks: SortValuesType }

type PacksTablePayloadType = PackType[]

type RangeCardsPayloadType = { min: number; max: number }

type PaginationPacksDataPayloadType = { page: number; pageCount: number }

type SearchPacksPayloadType = { search: string }

type IsMyPacksPayloadType = { isMyPacks: boolean }

export type UpdatePackDataType = {
  id: string
  name: string
}
