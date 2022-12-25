import React, { MouseEvent } from 'react'

import TableCell from '@mui/material/TableCell'

import { CustomDeleteIconButton } from '../../../../common/components/CustomIconButtons/CustomDeleteIconButton'
import { CustomEditIconButton } from '../../../../common/components/CustomIconButtons/CustomEditIconButton'
import { CustomStudyIconButton } from '../../../../common/components/CustomIconButtons/CustomStudyIconButton'

import s from './PacksActionCell.module.scss'

type PacksActionCellPropsType = {
  isMine: boolean
  isStudyDisabled: boolean
  isAllDisabled: boolean
  onStudy: () => void
  onEdit: () => void
  onDelete: () => void
}

export const PacksActionCell: React.FC<PacksActionCellPropsType> = ({
  isMine,
  isStudyDisabled,
  isAllDisabled,
  onStudy,
  onEdit,
  onDelete,
}) => {
  const handleSpanClick = (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation()
  const handleStudyClick = () => onStudy()
  const handleEditClick = () => onEdit()
  const handleDeleteClick = () => onDelete()

  return (
    <TableCell>
      <span className={s.span} onClick={handleSpanClick}>
        <CustomStudyIconButton
          onClick={handleStudyClick}
          disabled={isStudyDisabled || isAllDisabled}
          tooltip={'Study'}
        />
        {isMine && (
          <CustomEditIconButton
            onClick={handleEditClick}
            disabled={isAllDisabled}
            tooltip={'Edit'}
          />
        )}
        {isMine && (
          <CustomDeleteIconButton
            onClick={handleDeleteClick}
            disabled={isAllDisabled}
            tooltip={'Delete'}
          />
        )}
      </span>
    </TableCell>
  )
}
