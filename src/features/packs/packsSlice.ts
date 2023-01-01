import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { RequestStatusPayloadType, setAppStatus, setTableStatus } from '../../app/appSlice'
import { AppDispatchType, RootStateType } from '../../app/store'
import { CreatePackType, packsAPI, ServerPackType } from '../../services/packsApi'
import { handleServerNetworkError } from '../../utils/errorUtils'

const initialState = {
  queryParams: {
    min: 0,
    max: 0,
    page: 1,
    pageCount: 8,
    sortPacks: '0updated' as SortValuesType,
    search: '',
    isMyPacks: '' as 'yes' | '',
  },
  cardsCount: {
    minCardsCount: 0,
    maxCardsCount: 0,
    cardPacksTotalCount: 0,
  },
  isDataReset: false,
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
    setCardsCount(state, action: PayloadAction<SetCardsCountPayloadType>) {
      state.cardsCount = { ...action.payload }
    },
    setPackRequestStatus(state, action: PayloadAction<PackRequestStatusPayloadType>) {
      state.tableData.forEach(p => {
        if (p._id === action.payload.packId) {
          p.requestStatus = action.payload.requestStatus
        }
      })
    },
    resetPacksQueryParams(state) {
      state.queryParams = initialState.queryParams
    },
    toggleResetStatus(state) {
      state.isDataReset = !state.isDataReset
    },
  },
})

export const packsReducer = packsSlice.reducer

// ACTIONS
export const {
  setPacksQueryParams,
  setPackRequestStatus,
  setPacksTableData,
  setCardsCount,
  resetPacksQueryParams,
  toggleResetStatus,
} = packsSlice.actions

// THUNKS
export const updatePacksQueryParamsTC =
  (queryProps: PacksQueryParamsType) =>
  async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      dispatch(setTableStatus('loading'))

      // THE TYPES BUG WAS FOUND, THIS IS THE FIX
      const { max, min, page, pageCount } = queryProps
      const stateQueryParams = getState().packs.queryParams

      dispatch(
        setPacksQueryParams({
          ...queryProps,
          max: max || max === 0 ? +max : stateQueryParams.max,
          min: min || min === 0 ? +min : stateQueryParams.min,
          page: page || page === 0 ? +page : stateQueryParams.page,
          pageCount: pageCount || pageCount === 0 ? +pageCount : stateQueryParams.pageCount,
        })
      )
      await dispatch(getPacksTC())

      return true
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    } finally {
      dispatch(setTableStatus('idle'))
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
      const cardPacksTotalCount = response.data.cardPacksTotalCount

      dispatch(setPacksTableData(response.data.cardPacks))
      dispatch(setCardsCount({ minCardsCount, maxCardsCount, cardPacksTotalCount }))
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }

export const deletePackTC = (id: string) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatus('loading'))
    dispatch(setPackRequestStatus({ packId: id, requestStatus: 'loading' }))
    await packsAPI.deletePack(id)
    await dispatch(getPacksTC())
  } catch (e) {
    dispatch(setPackRequestStatus({ packId: id, requestStatus: 'idle' }))
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  } finally {
    dispatch(setAppStatus('idle'))
  }
}

export const addPackTC = (data: CreatePackType) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatus('loading'))
    dispatch(setTableStatus('loading'))
    await packsAPI.addPack(data)
    await dispatch(getPacksTC())
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  } finally {
    dispatch(setAppStatus('idle'))
    dispatch(setTableStatus('idle'))
  }
}

export const updatePackTC =
  (data: UpdatePackDataType) =>
  async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      dispatch(setAppStatus('loading'))
      dispatch(setPackRequestStatus({ packId: data.id, requestStatus: 'loading' }))
      const updatingPack = getState().packs.tableData.filter(pack => data.id === pack._id)

      await packsAPI.updatePack({ ...updatingPack[0], name: data.name })
      await dispatch(getPacksTC())
    } catch (e) {
      dispatch(setPackRequestStatus({ packId: data.id, requestStatus: 'idle' }))
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    } finally {
      dispatch(setAppStatus('idle'))
    }
  }

// TYPES
export type PacksStateType = typeof initialState
export type AppPackType = ServerPackType & { requestStatus: RequestStatusPayloadType }

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

type PackRequestStatusPayloadType = {
  packId: string
  requestStatus: RequestStatusPayloadType
}

type SetCardsCountPayloadType = {
  minCardsCount: number
  maxCardsCount: number
  cardPacksTotalCount: number
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
}

type PackResetStatusPayloadType = {
  isDataReset: boolean
}
