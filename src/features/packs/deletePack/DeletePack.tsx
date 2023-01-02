import React from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../hooks/reduxHooks'
import { deletePackTC } from '../packsSlice'

import s from './DeletePack.module.scss'

type DeletePackType = {
  packData: PackDeleteDataType
  activeModal: (state: boolean) => void
}

export const DeletePack: React.FC<DeletePackType> = ({ packData, activeModal }) => {
  const dispatch = useAppDispatch()
  const handleDeletePacK = async () => {
    await dispatch(deletePackTC(packData.id))
    activeModal(false)
  }
  const handleCloseModal = () => activeModal(false)

  return (
    <div>
      <p className={s.Message}>
        Are you sure you want to delete Pack: <b>{packData.name}</b> ?
        <br />
        All cards will be deleted.
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

export type PackDeleteDataType = {
  id: string
  name: string
}
