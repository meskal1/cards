import { FC } from 'react'

import { Dialog } from '../../../../common/components/Popups/Dialog/Dialog'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useEnterKey } from '../../../../hooks/useEnterKey'
import { deleteCardTC } from '../../cardsSlice'

type DeleteCardType = {
  id: string
  isOpened: boolean
  onClose: () => void
}

export const DeleteCard: FC<DeleteCardType> = ({ id, isOpened, onClose }) => {
  const dispatch = useAppDispatch()

  const handleDeleteCard = () => {
    dispatch(deleteCardTC(id))
    onClose()
  }

  useEnterKey(handleDeleteCard)

  return (
    <Dialog
      title={'Delete card'}
      primaryColor={'red'}
      onOkButtonText={'Delete'}
      onOk={handleDeleteCard}
      isOpened={isOpened}
      onClose={onClose}
    >
      Are you sure you want to delete current card? Confirm deletion
    </Dialog>
  )
}
