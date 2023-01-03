import { useSearchParams } from 'react-router-dom'

import { RequestStatusPayloadType, setTableStatus } from '../../../app/appSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { getPacksTC, clearPacksQueryParams, toggleResetStatus } from '../packsSlice'

import s from './PacksResetFilter.module.scss'

export const PacksResetFilter = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const isDataLoading = useAppSelector<RequestStatusPayloadType>(state => state.app.tableStatus)

  const handleResetFilter = async () => {
    if (isDataLoading === 'idle') {
      dispatch(toggleResetStatus())
      dispatch(clearPacksQueryParams())
      searchParams.delete('min')
      searchParams.delete('max')
      searchParams.delete('page')
      searchParams.delete('pageCount')
      searchParams.delete('search')
      searchParams.delete('isMyPacks')
      searchParams.delete('sortPacks')
      setSearchParams(searchParams)
      dispatch(setTableStatus('loading'))
      await dispatch(getPacksTC())
      dispatch(setTableStatus('idle'))
    }
  }

  return (
    <>
      <div className={s.packsResetFilter} onClick={handleResetFilter} />
    </>
  )
}
