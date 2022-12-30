import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../hooks/reduxHooks'
import { getPacksTC, resetPacksQueryParams, toggleResetStatus } from '../packsSlice'

import s from './PacksResetFilter.module.scss'

export const PacksResetFilter = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleResetFilter = () => {
    dispatch(toggleResetStatus())
    dispatch(resetPacksQueryParams())
    searchParams.delete('min')
    searchParams.delete('max')
    searchParams.delete('page')
    searchParams.delete('pageCount')
    searchParams.delete('search')
    searchParams.delete('isMyPacks')
    setSearchParams(searchParams)
    dispatch(getPacksTC())
  }

  return (
    <>
      <div className={s.packsResetFilter} onClick={handleResetFilter} />
    </>
  )
}
