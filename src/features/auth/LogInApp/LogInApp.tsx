import { useState } from 'react'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { FormControlLabel, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { RequestStatusType } from '../../../app/appSlice'
import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { CustomInput } from '../../../common/components/CustomInput/CustomInput'
import { CustomPasswordInput } from '../../../common/components/CustomPasswordInput/CustomPasswordInput'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { validationSchemaLogin } from '../../../utils/validationSchema'
import { logInTC } from '../authSlice'

import s from './LogInApp.module.scss'

export const LogInApp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector<RequestStatusType>(state => state.auth.status)
  const [showNote, setShowNote] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async values => {
      const isLoginSucceed = await dispatch(logInTC(values))

      if (isLoginSucceed) {
        navigate(PATH.PACKS)
      }
    },
  })

  const handleShowNote = () => setShowNote(prevState => !prevState)

  return (
    <div className={s.loginContainer}>
      <h2 className={s.login__title}>Sign in</h2>
      <form className={s.login__form} onSubmit={formik.handleSubmit}>
        <CustomInput
          label="Email"
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          {...formik.getFieldProps('email')}
        />

        <CustomPasswordInput
          label="Password"
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          {...formik.getFieldProps('password')}
        />

        <div className={s.login__blockRemember}>
          <FormControlLabel
            className={s.login__checkBoxBlock}
            label={<Typography className={s.login__typography}>Remember me</Typography>}
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
            Forgot password?
          </Link>
        </div>

        <div className={s.login__buttonsBlock}>
          <CustomButton className={s.login__buttonSignIn} disabled={authStatus === 'loading'}>
            <p>Sign in</p>
          </CustomButton>
          <Link className={s.login__signUp} to={PATH.REGISTRATION}>
            Sign up
          </Link>
        </div>
      </form>

      <div className={s.login__signUpBlock}>
        <p className={s.login__text}>
          To log in, get registered or use common test account credentials:
        </p>

        <p className={s.login__textEmail}>
          Email: <span className={s.credentialsColor}>testsetcards2022@gmail.com</span>
        </p>

        <p className={s.login__textPassword}>
          Password: <span className={s.credentialsColor}>testsetcards</span>
        </p>

        <p className={s.login__notesContainer}>
          <span className={s.login__notes} onClick={handleShowNote}>
            Read important notes
          </span>

          {showNote && (
            <span className={s.login__notesText}>
              If you are using test account, you should know, if several people use test account at
              the same time, then you will be kicked out of the application.
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
