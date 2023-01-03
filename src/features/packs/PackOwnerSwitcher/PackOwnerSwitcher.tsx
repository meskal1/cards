import { useEffect } from 'react'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useGetSearchParams } from '../../../hooks/useGetSearchParams'
import { updatePacksQueryParamsTC } from '../packsSlice'

import s from './PackOwnerSwitcher.module.scss'

export const PackOwnerSwitcher = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = useGetSearchParams()
  const isMyPacks = useAppSelector(state => state.packs.queryParams.isMyPacks)

  const handleMyCards = () => {
    setSearchParams({ ...allParams, isMyPacks: 'yes' })
    searchParams.delete('min')
    searchParams.delete('max')
    searchParams.delete('page')
    setSearchParams(searchParams)
    dispatch(updatePacksQueryParamsTC({ isMyPacks: 'yes', min: 0, max: 0, page: 1 }))
  }

  const handleAllCards = () => {
    searchParams.delete('isMyPacks')
    searchParams.delete('min')
    searchParams.delete('max')
    searchParams.delete('page')
    setSearchParams(searchParams)
    dispatch(updatePacksQueryParamsTC({ isMyPacks: '', min: 0, max: 0, page: 1 }))
  }

  useEffect(() => {
    if (isMyPacks && allParams.isMyPacks === undefined) {
      setSearchParams({ ...allParams, isMyPacks: 'yes' })
    }
  }, [allParams])

  return (
    <>
      <div className={s.switcherContainer}>
        <p className={s.switcher__title}>show packs cards</p>
        <ButtonGroup className={s.switcher__block} disableElevation variant="text">
          <Button
            disabled={!!isMyPacks}
            className={`${s.switcher__blockItem} ${isMyPacks ? s.active : ''}`}
            onClick={handleMyCards}
          >
            <p>my</p>
          </Button>
          <Button
            disabled={!isMyPacks}
            className={`${s.switcher__blockItem} ${isMyPacks ? '' : s.active}`}
            onClick={handleAllCards}
          >
            <p>all</p>
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}
