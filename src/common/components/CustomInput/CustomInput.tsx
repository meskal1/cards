import React from 'react'

import { TextField, TextFieldProps } from '@mui/material'

import s from './CustomInput.module.scss'

type CustomInputPropsType = TextFieldProps & {
  value: string //Use our value to control input and also because value in MUI has unknown type
}

export const CustomInput: React.FC<CustomInputPropsType> = ({
  className,
  helperText,
  ...props
}) => {
  const finalClass = `${s.input} ${className ? className : ''}`
  const errorText = helperText ? helperText : ' '

  return (
    <TextField
      className={finalClass}
      variant={'standard'}
      type={'text'}
      fullWidth
      {...props}
      helperText={errorText}
    />
  )
}
