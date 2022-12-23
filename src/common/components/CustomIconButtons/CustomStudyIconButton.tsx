import React from 'react'

import { IconButton, Tooltip } from '@mui/material'
import { IconButtonProps } from '@mui/material/IconButton/IconButton'

import studyIcon from '../../../assets/img/icons/studyPack.svg'

import s from './CustomIconButton.module.scss'

type CustomStudyIconButtonPropsType = IconButtonProps & {
  tooltip?: string
}

export const CustomStudyIconButton: React.FC<CustomStudyIconButtonPropsType> = ({
  tooltip,
  className,
  ...props
}) => {
  const finalClass = `${s.iconBtn} ${className ? className : ''}`

  return (
    <Tooltip title={tooltip}>
      <span>
        <IconButton className={finalClass} {...props}>
          <img src={studyIcon} alt={'Study icon'} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
