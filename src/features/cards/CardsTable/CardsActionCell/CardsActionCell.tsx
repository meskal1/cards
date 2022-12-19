import React, { MouseEvent } from 'react'

import { IconButton } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import deleteIcon from '../../../../assets/img/icons/deletePack.svg'
import editIcon from '../../../../assets/img/icons/editPack.svg'

type CardsTableActionCellType = {
  editCard: () => void
  deleteCard: () => void
}

export const CardsActionCell: React.FC<CardsTableActionCellType> = ({ editCard, deleteCard }) => {
  const createHandlerWithoutPropagation = (e: MouseEvent<HTMLButtonElement>, func: () => void) => {
    e.stopPropagation()
    func()
  }

  return (
    <TableCell>
      <IconButton onClick={e => createHandlerWithoutPropagation(e, editCard)}>
        <img src={editIcon} alt={'Edit icon'} />
      </IconButton>
      <IconButton onClick={e => createHandlerWithoutPropagation(e, deleteCard)}>
        <img src={deleteIcon} alt={'Delete icon'} />
      </IconButton>
    </TableCell>
  )
}
