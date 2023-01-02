import { useState, FC } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material'

import { CustomInput } from '../CustomInput/CustomInput'

type CustomPasswordInputPropsType = TextFieldProps & {
  value: string //Use our value to control input and also because value in MUI has unknown type
}

export const CustomPasswordInput: FC<CustomPasswordInputPropsType> = ({
  value,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  return (
    <CustomInput
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
