import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { RequestStatusType } from '../../app/appSlice'
import { AppDispatchType, RootStateType } from '../../app/store'
import { CreatePackType, packsAPI, ServerPackType } from '../../services/packsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'

const initialState = {
  queryParams: {
    min: 0,
    max: 0,
    page: 1,
    pageCount: 10,
    sortPacks: '0updated' as SortValuesType,
    search: '',
    isMyPacks: '' as 'yes' | '',
  },
  tableData: [] as AppPackType[],
}

const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacksQueryParams(state, action: PayloadAction<PacksQueryParamsType>) {
      state.queryParams = { ...state.queryParams, ...action.payload }
    },
    setPacksTableData(state, action: PayloadAction<PacksTablePayloadType>) {
      state.tableData = action.payload.map(p => ({ ...p, requestStatus: 'idle' }))
    },
    setPackRequestStatus(state, action: PayloadAction<PackRequestStatusPayloadType>) {
      state.tableData.forEach(p => {
        if (p._id === action.payload.packId) {
          p.requestStatus = action.payload.requestStatus
        }
      })
    },
  },
})

export const packsReducer = packsSlice.reducer

// ACTIONS
export const { setPacksQueryParams, setPackRequestStatus, setPacksTableData } = packsSlice.actions

// THUNKS
export const updatePacksQueryParamsTC =
  (queryProps: PacksQueryParamsType) => async (dispatch: AppDispatchType) => {
    try {
      dispatch(setPacksQueryParams(queryProps))
      await dispatch(getPacksTC())
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }

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
      const minCardsCount = response.data.minCardsCount
      const maxCardsCount = response.data.maxCardsCount

      dispatch(setPacksTableData(response.data.cardPacks))

      // if (min && max) {
      dispatch(setPacksQueryParams({ min: minCardsCount, max: maxCardsCount }))
      // }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }

export const deletePackTC = (id: string) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setPackRequestStatus({ packId: id, requestStatus: 'loading' }))
    await packsAPI.deletePack(id)
    dispatch(getPacksTC())
  } catch (e) {
    dispatch(setPackRequestStatus({ packId: id, requestStatus: 'idle' }))
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
}

export const addPackTC = (data: CreatePackType) => async (dispatch: AppDispatchType) => {
  try {
    await packsAPI.addPack(data)
    dispatch(getPacksTC())
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
}

export const updatePackTC =
  (data: UpdatePackDataType) =>
  async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      dispatch(setPackRequestStatus({ packId: data.id, requestStatus: 'loading' }))
      const updatingPack = getState().packs.tableData.filter(pack => data.id === pack._id)

      await packsAPI.updatePack({ ...updatingPack[0], name: data.name })
      dispatch(getPacksTC())
    } catch (e) {
      dispatch(setPackRequestStatus({ packId: data.id, requestStatus: 'idle' }))
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }

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

type PacksTablePayloadType = ServerPackType[]

type PackRequestStatusPayloadType = { packId: string; requestStatus: RequestStatusType }

type SortPacksPayloadType = { sortPacks: SortValuesType }

type SetPacksQueryParamsPayloadType = {
  min: number
  max: number
  page: number
  pageCount: number
  sortPacks: SortValuesType
  search: string
  isMyPacks: 'yes' | ''
}

type SetCardsCountPayloadType = {
  maxCardsCount: number
  minCardsCount: number
}

type PacksQueryParamsType = Partial<SetPacksQueryParamsPayloadType>

export type UpdatePackDataType = {
  id: string
  name: string
}
