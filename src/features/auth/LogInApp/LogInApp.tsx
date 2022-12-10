import * as React from 'react'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FormControlLabel, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'

import { ButtonStyled } from '../../../common/components/ButtonStyled/ButtonStyled'
import { PATH } from '../../../constants/routePaths.enum'

import s from './LogInApp.module.scss'

type LogInAppType = {}

interface State {
  amount: string
  password: string
  weight: string
  weightRange: string
  showPassword: boolean
}

export const LogInApp: React.FC<LogInAppType> = ({}) => {
  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const onChangePassword = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const onMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <div className={s.loginContainer}>
        <h2 className={s.loginContainer__title}>sign in</h2>
        <form className={s.loginContainer__form} onSubmit={() => alert('сабмит формы')}>
          <FormControl variant="standard">
            {/* <InputLabel htmlFor='standard-adornment-email'>email</InputLabel> */}
            <TextField id="standard-adornment-email" label="Email" variant="standard" />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={onChangePassword('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onClickShowPassword}
                    onMouseDown={onMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <div className={s.loginContainer__blockRemember}>
            <FormControlLabel
              sx={{
                mr: 0,
              }}
              label={
                <Typography
                  sx={{
                    marginRight: 0,
                    fontFamily: 'inherit',
                    letterSpacing: 'inherit',
                    userSelect: 'none',
                    MozUserSelect: 'none',
                    KhtmlUserSelect: 'none',
                  }}
                >
                  Remember me
                </Typography>
              }
              control={
                <Checkbox
                  className={s.checkbox}
                  checked={true} // change hardcoded
                  size="medium"
                  style={true ? { color: '#1B79CE ' } : { color: 'grey ' }} // eslint-disable-line
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<TaskAltIcon />}
                />
              }
            />
            <a className={s.loginContainer__forgotPassword} href={PATH.RECOVERY}>
              forgot password?
            </a>
          </div>
          <ButtonStyled name={'Sign in'} onClick={() => alert('нажал на кнопку')} />
        </form>
        <div className={s.loginContainer__signUpBlock}>
          <p className={s.loginContainer__text}>already have an account?</p>
          <a className={s.loginContainer__signUp} href={PATH.REGISTRATION}>
            sign up
          </a>
        </div>
      </div>
    </>
  )
}
