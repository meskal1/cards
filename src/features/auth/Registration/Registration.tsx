import React from 'react'

import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { CustomPasswordInput } from '../../../common/components/CustomPasswordInput/CustomPasswordInput'
import { PATH } from '../../../constants/routePaths.enum'
import { validationSchemaRegistration } from '../../../utils/validationSchema'

import s from './Registration.module.scss'

type RegistrationType = {}

export const Registration: React.FC<RegistrationType> = ({}) => {
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchemaRegistration,
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <div className={s.registration}>
      <form className={s.form} onSubmit={handleSubmit}>
        <h3 className={s.title}>sign up</h3>
        <TextField
          className={s.input}
          label={'Email'}
          variant={'standard'}
          fullWidth
          autoComplete={'new-password'}
          error={!!errors.email && touched.email}
          helperText={touched.email && errors.email}
          {...getFieldProps('email')}
        />
        <CustomPasswordInput
          className={s.input}
          label={'Password'}
          fullWidth
          autoComplete={'new-password'}
          error={!!errors.password && touched.password}
          helperText={touched.password && errors.password}
          {...getFieldProps('password')}
        />
        <CustomPasswordInput
          className={s.input}
          label={'Confirm password'}
          fullWidth
          autoComplete={'new-password'}
          error={!!errors.confirmPassword && touched.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
          {...getFieldProps('confirmPassword')}
        />
        <CustomButton className={s.button}>sign up</CustomButton>
        <p className={s.signInQuestion}>Already have an account?</p>
        <Link className={s.signInLink} to={PATH.LOGIN}>
          sign in
        </Link>
      </form>
    </div>
  )
}
