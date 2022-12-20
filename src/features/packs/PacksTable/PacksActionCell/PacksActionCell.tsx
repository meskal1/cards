import React, { MouseEvent } from 'react'

import { IconButton, Tooltip } from '@mui/material'
import TableCell from '@mui/material/TableCell'

import deleteIcon from '../../../../assets/img/icons/deletePack.svg'
import editIcon from '../../../../assets/img/icons/editPack.svg'
import studyIcon from '../../../../assets/img/icons/studyPack.svg'
import { CustomButton } from '../../../../common/components/CustomButton/CustomButton'

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
        <Tooltip title={'Study'}>
          <IconButton className={s.btn} disabled={isStudyDisabled} onClick={e => studyCard()}>
            <img src={studyIcon} alt={'Study icon'} />
          </IconButton>
        </Tooltip>
        {isMine && (
          <Tooltip title={'Edit'}>
            <IconButton className={s.btn} onClick={e => editCard()}>
              <img src={editIcon} alt={'Edit icon'} />
            </IconButton>
          </Tooltip>
        )}
        {isMine && (
          <Tooltip title={'Delete'}>
            <IconButton className={s.btn} onClick={e => deleteCard()}>
              <img src={deleteIcon} alt={'Delete icon'} />
            </IconButton>
          </Tooltip>
        )}
      </span>
    </TableCell>
  )
}
