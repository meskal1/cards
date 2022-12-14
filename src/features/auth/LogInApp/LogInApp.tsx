import * as React from 'react'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { FormControlLabel, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { CustomInput } from '../../../common/components/CustomInput/CustomInput'
import { CustomPasswordInput } from '../../../common/components/CustomPasswordInput/CustomPasswordInput'
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
          <CustomInput
            className={s.login__field}
            label="email"
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps('email')}
          />

          <CustomPasswordInput
            className={s.login__field}
            label="password"
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />

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

          <CustomButton>sign in</CustomButton>
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
