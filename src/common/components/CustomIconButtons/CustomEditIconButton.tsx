import { FC } from 'react'

import { IconButton, Tooltip } from '@mui/material'
import { IconButtonProps } from '@mui/material/IconButton/IconButton'

import s from './CustomIconButton.module.scss'

type CustomStudyIconButtonPropsType = IconButtonProps & {
  tooltip?: string
}

export const CustomEditIconButton: FC<CustomStudyIconButtonPropsType> = ({
  tooltip,
  className,
  ...props
}) => {
  const finalClass = `${s.iconBtn} ${className ? className : ''}`

  return (
    <Tooltip title={tooltip}>
      <span>
        <IconButton className={finalClass} {...props}>
          <div className={s.editIcon} />
        </IconButton>
      </span>
    </Tooltip>
  )
}
