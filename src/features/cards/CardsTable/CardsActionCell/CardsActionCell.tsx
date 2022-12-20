import React, { MouseEvent } from 'react'

import { IconButton, Tooltip } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import deleteIcon from '../../../../assets/img/icons/deletePack.svg'
import editIcon from '../../../../assets/img/icons/editPack.svg'

import s from './CardsActionCell.module.scss'

type CardsTableActionCellType = {
  editCard: () => void
  deleteCard: () => void
}

export const CardsActionCell: React.FC<CardsTableActionCellType> = ({ editCard, deleteCard }) => {
  const handleSpanClick = (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation()

  return (
    <TableCell>
      <span className={s.span} onClick={handleSpanClick}>
        <Tooltip title={'Edit'}>
          <IconButton onClick={e => editCard()}>
            <img src={editIcon} alt={'Edit icon'} />
          </IconButton>
        </Tooltip>
        <Tooltip title={'Delete'}>
          <IconButton onClick={e => deleteCard()}>
            <img src={deleteIcon} alt={'Delete icon'} />
          </IconButton>
        </Tooltip>
      </span>
    </TableCell>
  )
}
