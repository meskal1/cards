import { FC } from 'react'

import Button from '@mui/material/Button'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATH } from '../../../../constants/routePaths.enum'
import { useAppDispatch } from '../../../../hooks/reduxHooks'
import { clearPacksQueryParams, deletePackTC } from '../../packsSlice'

import s from './DeletePack.module.scss'

type DeletePackType = {
  packData: PackDeleteDataType
  activeModal: (state: boolean) => void
}

export const DeletePack: FC<DeletePackType> = ({ packData, activeModal }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const handleDeletePacK = async () => {
    await dispatch(deletePackTC(packData.id))
    activeModal(false)
    if (/cards/gi.test(location.pathname)) {
      dispatch(clearPacksQueryParams())
      navigate(PATH.PACKS)
    }
  }
  const handleCloseModal = () => activeModal(false)

  return (
    <div className={s.MainContainer}>
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
