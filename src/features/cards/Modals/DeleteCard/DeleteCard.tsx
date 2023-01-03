import React from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../../hooks/reduxHooks'
import { deleteCardTC } from '../../cardsSlice'

import s from './DeleteCard.module.scss'

type DeleteCardType = {
  id: string
  activeModal: (state: boolean) => void
}

export const DeleteCard: React.FC<DeleteCardType> = ({ id, activeModal }) => {
  const dispatch = useAppDispatch()
  const handleCloseModal = () => activeModal(false)
  const handleDeletePacK = async () => {
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
