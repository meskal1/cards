import React from 'react'

import { IconButton, Tooltip } from '@mui/material'
import { IconButtonProps } from '@mui/material/IconButton/IconButton'

import deleteIcon from '../../../assets/img/icons/deletePack.svg'

import s from './CustomIconButton.module.scss'

type CustomStudyIconButtonPropsType = IconButtonProps & {
  tooltip?: string
}

export const CustomDeleteIconButton: React.FC<CustomStudyIconButtonPropsType> = ({
  tooltip,
  className,
  ...props
}) => {
  const finalClass = `${s.iconBtn} ${className ? className : ''}`

  return (
    <Tooltip title={tooltip}>
      <IconButton className={finalClass} {...props}>
        <img src={deleteIcon} alt={'Delete icon'} />
      </IconButton>
    </Tooltip>
  )
}
