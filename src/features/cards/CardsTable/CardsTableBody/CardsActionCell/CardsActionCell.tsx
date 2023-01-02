import React, { FC, MouseEvent } from 'react'

import TableCell from '@mui/material/TableCell'

import { CustomDeleteIconButton } from '../../../../../common/components/CustomIconButtons/CustomDeleteIconButton'
import { CustomEditIconButton } from '../../../../../common/components/CustomIconButtons/CustomEditIconButton'

import s from './CardsActionCell.module.scss'

type CardsTableActionCellType = {
  isAllDisabled: boolean
  onEdit: () => void
  onDelete: () => void
}

export const CardsActionCell: FC<CardsTableActionCellType> = ({
  isAllDisabled,
  onEdit,
  onDelete,
}) => {
  const handleSpanClick = (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation()
  const handleEditCardClick = () => onEdit()
  const handleDeleteCardClick = () => onDelete()

  return (
    <TableCell>
      <span className={s.span} onClick={handleSpanClick}>
        <CustomEditIconButton
          disabled={isAllDisabled}
          onClick={handleEditCardClick}
          tooltip={'Edit'}
        />
        <CustomDeleteIconButton
          disabled={isAllDisabled}
          onClick={handleDeleteCardClick}
          tooltip={'Delete'}
        />
      </span>
    </TableCell>
  )
}
