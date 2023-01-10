import { useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../hooks/reduxHooks'
import { getPacksTC, clearPacksQueryParams, toggleResetData } from '../packsSlice'

import s from './PacksResetFilter.module.scss'

export const PacksResetFilter = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [canIReset, setCanIReset] = useState(true)

  const handleResetFilter = async () => {
    if (canIReset) {
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
      setCanIReset(false)
      await dispatch(getPacksTC())
      setCanIReset(true)
    }
  }

  return (
    <>
      <div className={s.packsResetFilter} onClick={handleResetFilter} />
    </>
  )
}
