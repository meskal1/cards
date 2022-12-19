import React, { MouseEvent } from 'react'

import { IconButton } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import deleteIcon from '../../../../assets/img/icons/deletePack.svg'
import editIcon from '../../../../assets/img/icons/editPack.svg'
import studyIcon from '../../../../assets/img/icons/studyPack.svg'

type PacksActionCellPropsType = {
  isMine: boolean
  studyCard: () => void
  editCard: () => void
  deleteCard: () => void
}

export const PacksActionCell: React.FC<PacksActionCellPropsType> = ({
  isMine,
  studyCard,
  editCard,
  deleteCard,
}) => {
  const createHandlerWithoutPropagation = (e: MouseEvent<HTMLButtonElement>, func: () => void) => {
    e.stopPropagation()
    func()
  }

  return (
    <TableCell>
      <IconButton onClick={e => createHandlerWithoutPropagation(e, studyCard)}>
        <img src={studyIcon} alt={'Study icon'} />
      </IconButton>
      {isMine && (
        <IconButton onClick={e => createHandlerWithoutPropagation(e, editCard)}>
          <img src={editIcon} alt={'Edit icon'} />
        </IconButton>
      )}
      {isMine && (
        <IconButton onClick={e => createHandlerWithoutPropagation(e, deleteCard)}>
          <img src={deleteIcon} alt={'Delete icon'} />
        </IconButton>
      )}
    </TableCell>
  )
}
