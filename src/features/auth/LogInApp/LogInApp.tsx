import * as React from 'react'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FormControlLabel, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { ButtonStyled } from '../../../common/components/ButtonStyled/ButtonStyled'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { validationSchemaLogin } from '../../../utils/validationSchema'
import { logInTC } from '../authSlice'

import s from './LogInApp.module.scss'

type LogInAppType = {}

export const LogInApp: React.FC<LogInAppType> = ({}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const appStatus = useAppSelector(state => state.app.status)
  const [showPassword, setShowPassword] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: validationSchemaLogin,
    onSubmit: values => {
      dispatch(logInTC(values))
    },
  })

  const onClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      formik.resetForm()
      navigate(PATH.PROFILE)
    }
  }, [isLoggedIn])

  return (
    <>
      <div className={s.loginContainer}>
        <h2 className={s.login__title}>sign in</h2>
        <form className={s.login__form} onSubmit={formik.handleSubmit}>
          <TextField
            className={s.login__field}
            label="email"
            variant="standard"
            {...formik.getFieldProps('email')}
          />
          <div className={s.login__errorBlock}>{formik.touched.email && formik.errors.email}</div>

          <TextField
            className={s.login__field}
            type={showPassword ? 'text' : 'password'}
            label="password"
            variant="standard"
            {...formik.getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className={s.login__errorBlock}>
            {formik.touched.password && formik.errors.password}
          </div>

          <div className={s.login__blockRemember}>
            <FormControlLabel
              className={s.login__checkBoxBlock}
              label={<Typography className={s.login__typography}>remember me</Typography>}
              control={
                <Checkbox
                  {...formik.getFieldProps('rememberMe')}
                  className={s.checkbox}
                  checked={formik.values.rememberMe}
                  size="medium"
                  style={formik.values.rememberMe ? { color: '#1B79CE ' } : { color: 'grey ' }}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<TaskAltIcon />}
                />
              }
            />
            <Link className={s.login__forgotPassword} to={PATH.RECOVERY}>
              forgot password?
            </Link>
          </div>

          <ButtonStyled name={'Sign in'} />
        </form>

        <div className={s.login__signUpBlock}>
          <p className={s.login__text}>already have an account?</p>
          <Link className={s.login__signUp} to={PATH.REGISTRATION}>
            sign up
          </Link>
        </div>
      </div>
    </>
  )
}
