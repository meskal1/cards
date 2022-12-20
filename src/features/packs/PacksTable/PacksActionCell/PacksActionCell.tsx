import React from 'react'

import TableCell from '@mui/material/TableCell'

import { CustomDeleteIconButton } from '../../../../common/components/CustomIconButtons/CustomDeleteIconButton'
import { CustomEditIconButton } from '../../../../common/components/CustomIconButtons/CustomEditIconButton'
import { CustomStudyIconButton } from '../../../../common/components/CustomIconButtons/CustomStudyIconButton'

import s from './PacksActionCell.module.scss'

type PacksActionCellPropsType = {
  isMine: boolean
  isStudyDisabled: boolean
  studyCard: () => void
  editCard: () => void
  deleteCard: () => void
}

export const PacksActionCell: React.FC<PacksActionCellPropsType> = ({
  isMine,
  isStudyDisabled,
  studyCard,
  editCard,
  deleteCard,
}) => {
  return (
    <TableCell>
      <span className={s.span} onClick={e => e.stopPropagation()}>
        <CustomStudyIconButton
          onClick={() => studyCard()}
          disabled={isStudyDisabled}
          tooltip={'Study'}
        />
        {isMine && <CustomEditIconButton onClick={() => editCard()} tooltip={'Edit'} />}
        {isMine && <CustomDeleteIconButton onClick={() => deleteCard()} tooltip={'Delete'} />}
      </span>
    </TableCell>
  )
}
