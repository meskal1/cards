import { FC } from 'react'

import { TextField, TextFieldProps } from '@mui/material'

import s from './CustomInput.module.scss'

type CustomInputPropsType = TextFieldProps & {
  value: string //Use our value to control input and also because value in MUI has unknown type
}

export const CustomInput: FC<CustomInputPropsType> = ({ className, helperText, ...props }) => {
  const finalClass = `${s.input} ${className ? className : ''}`
  const errorText = helperText || ' '

  return (
    <TextField
      className={finalClass}
      variant={props.variant || 'standard'}
      type={props.type || 'text'}
      fullWidth={props.fullWidth || true}
      {...props}
      helperText={errorText}
    />
  )
}
