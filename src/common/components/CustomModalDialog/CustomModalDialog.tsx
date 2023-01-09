import React from 'react'

import { Close } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import { EditPack } from '../../../features/packs/Modals/EditPack/EditPack'
import s from '../../../features/packs/PacksTable/PacksTable.module.scss'

type CustomModalDialogType = {
  open: boolean
  closeModal: (state: boolean) => void
  children: JSX.Element
}

export const CustomModalDialog: React.FC<CustomModalDialogType> = ({
  open,
  closeModal,
  children,
}) => {
  const handleCloseModal = () => closeModal(false)

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className={s.ChildrenContainer}>
          <div className={s.Close}>
            <Close onClick={handleCloseModal} />
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  )
}
