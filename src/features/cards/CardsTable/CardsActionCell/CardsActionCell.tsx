import React, { MouseEvent } from 'react'

import TableCell from '@mui/material/TableCell'

import { CustomDeleteIconButton } from '../../../../common/components/CustomIconButtons/CustomDeleteIconButton'
import { CustomEditIconButton } from '../../../../common/components/CustomIconButtons/CustomEditIconButton'

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
        <CustomEditIconButton onClick={() => editCard()} tooltip={'Edit'} />
        <CustomDeleteIconButton onClick={() => deleteCard()} tooltip={'Delete'} />
      </span>
    </TableCell>
  )
}
