import { useSearchParams } from 'react-router-dom'

import { RequestStatusType, setTableStatus } from '../../../app/appSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { getPacksTC, clearPacksQueryParams, toggleResetData } from '../packsSlice'

import s from './PacksResetFilter.module.scss'

export const PacksResetFilter = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const isDataLoading = useAppSelector<RequestStatusType>(state => state.app.tableStatus)

  const handleResetFilter = async () => {
    if (isDataLoading === 'idle') {
      dispatch(toggleResetData())
      dispatch(clearPacksQueryParams())
      searchParams.delete('min')
      searchParams.delete('max')
      searchParams.delete('page')
      searchParams.delete('pageCount')
      searchParams.delete('search')
      searchParams.delete('isMyPacks')
      searchParams.delete('sortPacks')
      setSearchParams(searchParams)
    }
  }

  return (
    <>
      <div className={s.packsResetFilter} onClick={handleResetFilter} />
    </>
  )
}
