import React from 'react'

import { IconButton, Tooltip } from '@mui/material'
import { IconButtonProps } from '@mui/material/IconButton/IconButton'

import editIcon from '../../../assets/img/icons/editPack.svg'

import s from './CustomIconButton.module.scss'

type CustomStudyIconButtonPropsType = IconButtonProps & {
  tooltip?: string
}

export const CustomEditIconButton: React.FC<CustomStudyIconButtonPropsType> = ({
  tooltip,
  className,
  ...props
}) => {
  const finalClass = `${s.iconBtn} ${className ? className : ''}`

  return (
    <Tooltip title={tooltip}>
      <span>
        <IconButton className={finalClass} {...props}>
          <img src={editIcon} alt={'Edit icon'} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
