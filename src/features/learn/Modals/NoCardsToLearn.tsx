import React from 'react'

import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'

import { PATH } from '../../../constants/routePaths.enum'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { extractPacksQueryParams } from '../../../utils/extractPacksQueryParams'
import { initialPacksQueryParams } from '../../packs/packsSlice'

import s from './NoCardsToLearn.module.scss'

export const NoCardsToLearn = () => {
  const navigate = useNavigate()
  const packsQueryParams = useAppSelector(state => state.packs.queryParams)
  const queryString = '?' + extractPacksQueryParams(packsQueryParams, initialPacksQueryParams)

  const handleChooseNewPack = () => navigate(PATH.PACKS + queryString)

  return (
    <div className={s.MainContainer}>
      <p className={s.Message}>
        No cards left in current Pack, you can choose another Pack from the list to learn
      </p>
      <div className={s.ButtonContainer}>
        <Button variant={'contained'} onClick={handleChooseNewPack}>
          Choose next Pack
        </Button>
      </div>
    </div>
  )
}
