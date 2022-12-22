import * as React from 'react'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setSearchCards, getCardsTC } from '../../cards/cardsSlice'
import { setSearchPacks, getPacksTC, setIsMyPacks } from '../packsSlice'

import s from './PackOwnerSwitcher.module.scss'

type PackOwnerSwitcherType = {}

export const PackOwnerSwitcher: React.FC<PackOwnerSwitcherType> = React.memo(({}) => {
  const dispatch = useAppDispatch()
  const isMyPacks = useAppSelector(state => state.packs.queryParams.isMyPacks)
  //   const [searchParams, setSearchParams] = useSearchParams()

  const handleMyCards = () => {
    //  setSearchParams(searchParams.append({ owner: 'my' }))
    //  console.log([...searchParams])
    dispatch(setIsMyPacks({ isMyPacks: true }))
    dispatch(getPacksTC())
  }

  const handleAllCards = () => {
    //  setSearchParams({ owner: 'all' })
    dispatch(setIsMyPacks({ isMyPacks: false }))
    dispatch(getPacksTC())
  }

  React.useEffect(() => {
    if (isMyPacks) {
      // setSearchParams({ owner: 'my' })
    }
  }, [])

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
})
