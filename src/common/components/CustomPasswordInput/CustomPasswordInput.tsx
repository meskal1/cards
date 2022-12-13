import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'

import s from './CustomPasswordInput.module.scss'

type CustomPasswordInputPropsType = TextFieldProps & {
  value: string //Use our value to control input and also because value in MUI has unknown type
}

export const CustomPasswordInput: React.FC<CustomPasswordInputPropsType> = ({
  value,
  type,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const finalClass = `${s.inputPassword} ${className ? className : ''}`

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  return (
    <TextField
      className={finalClass}
      variant={'standard'}
      type={showPassword ? 'text' : 'password'}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position={'end'}>
            {value && (
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}
