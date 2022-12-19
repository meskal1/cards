import React from 'react'

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
  return (
    <TableCell>
      <IconButton onClick={() => studyCard()}>
        <img src={studyIcon} alt={'Study icon'} />
      </IconButton>
      {isMine && (
        <IconButton onClick={() => editCard()}>
          <img src={editIcon} alt={'Edit icon'} />
        </IconButton>
      )}
      {isMine && (
        <IconButton onClick={() => deleteCard()}>
          <img src={deleteIcon} alt={'Delete icon'} />
        </IconButton>
      )}
    </TableCell>
  )
}
