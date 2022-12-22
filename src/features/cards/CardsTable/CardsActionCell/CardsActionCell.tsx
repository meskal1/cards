import React, { MouseEvent } from 'react'

import TableCell from '@mui/material/TableCell'

import { CustomDeleteIconButton } from '../../../../common/components/CustomIconButtons/CustomDeleteIconButton'
import { CustomEditIconButton } from '../../../../common/components/CustomIconButtons/CustomEditIconButton'

import s from './CardsActionCell.module.scss'

type CardsTableActionCellType = {
  onEdit: () => void
  onDelete: () => void
}

export const CardsActionCell: React.FC<CardsTableActionCellType> = ({ onEdit, onDelete }) => {
  const handleSpanClick = (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation()
  const handleEditCardClick = () => onEdit()
  const handleDeleteCardClick = () => onDelete()

  return (
    <TableCell>
      <span className={s.span} onClick={handleSpanClick}>
        <CustomEditIconButton onClick={handleEditCardClick} tooltip={'Edit'} />
        <CustomDeleteIconButton onClick={handleDeleteCardClick} tooltip={'Delete'} />
      </span>
    </TableCell>
  )
}
