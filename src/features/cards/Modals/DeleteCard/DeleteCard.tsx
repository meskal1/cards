import React from 'react'

import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { useGetSearchParams } from '../../../../hooks/useGetSearchParams'
import { deleteCardTC, setCardsQueryParams } from '../../cardsSlice'

import s from './DeleteCard.module.scss'

type DeleteCardType = {
  id: string
  activeModal: (state: boolean) => void
}

export const DeleteCard: React.FC<DeleteCardType> = ({ id, activeModal }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = useGetSearchParams()
  const tableData = useAppSelector(state => state.cards.tableData)
  const dispatch = useAppDispatch()

  const handleCloseModal = () => activeModal(false)
  const handleDeletePacK = async () => {
    if (tableData.length === 1 && allParams.page > 1) {
      setSearchParams({ ...allParams, page: allParams.page - 1 })
      dispatch(setCardsQueryParams({ page: allParams.page - 1 }))
    }
    await dispatch(deleteCardTC(id))
    activeModal(false)
  }

  return (
    <div>
      <p className={s.Message}>
        Are you sure you want to delete current Card?
        <br />
      </p>
      <div className={s.ButtonContainer}>
        <Button onClick={handleCloseModal} type={'button'} variant="outlined">
          Cancel
        </Button>
        <Button type={'button'} variant="contained" onClick={handleDeletePacK} color={'error'}>
          Delete
        </Button>
      </div>
    </div>
  )
}
