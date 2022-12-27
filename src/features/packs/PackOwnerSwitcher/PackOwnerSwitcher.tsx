import * as React from 'react'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { getSearchParams } from '../../../utils/getSearchParams'
import { updatePacksQueryParamsTC } from '../packsSlice'

import s from './PackOwnerSwitcher.module.scss'

export const PackOwnerSwitcher = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = getSearchParams(searchParams)
  const isMyPacks = useAppSelector(state => state.packs.queryParams.isMyPacks)

  const handleMyCards = () => {
    setSearchParams({ ...allParams, isMyPacks: 'yes' })
    dispatch(updatePacksQueryParamsTC({ isMyPacks: 'yes' }))
  }

  const handleAllCards = () => {
    searchParams.delete('isMyPacks')
    setSearchParams(searchParams)
    dispatch(updatePacksQueryParamsTC({ isMyPacks: '' }))
  }

  React.useEffect(() => {
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
            className={`${s.switcher__blockItem} ${isMyPacks ? s.active : ''}`}
            onClick={handleMyCards}
          >
            <p>my</p>
          </Button>
          <Button
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
