import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { initialPacksQueryParams as initParams, setPacksQueryParams } from '../packsSlice'

import s from './PackOwnerSwitcher.module.scss'

export const PackOwnerSwitcher = () => {
  const dispatch = useAppDispatch()
  const isMyPacks = useAppSelector(state => state.packs.queryParams.isMyPacks)

  const handleMyCards = () => dispatch(setPacksQueryParams({ ...initParams, isMyPacks: 'yes' }))

  const handleAllCards = () => dispatch(setPacksQueryParams(initParams))

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
