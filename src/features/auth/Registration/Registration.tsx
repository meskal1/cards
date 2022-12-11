import React from 'react'

import { TextField } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { CustomPasswordInput } from '../../../common/components/CustomPasswordInput/CustomPasswordInput'
import { PATH } from '../../../constants/routePaths.enum'

import s from './Registration.module.scss'

type RegistrationType = {}

export const Registration: React.FC<RegistrationType> = ({}) => {
  return (
    <div className={s.registration}>
      <form className={s.form}>
        <h3 className={s.title}>sign up</h3>
        <TextField
          className={s.input}
          name={'email'}
          label={'Email'}
          variant={'standard'}
          type={'email'}
          value={'qwerty@gmail.com'}
          fullWidth
        />
        <CustomPasswordInput
          className={s.input}
          name={'password'}
          label={'Password'}
          value={'qwerty'}
          fullWidth
        />
        <CustomPasswordInput
          className={s.input}
          name={'confirmPassword'}
          label={'Confirm password'}
          value={'qwerty'}
          fullWidth
        />
        <CustomButton className={s.button}>sign up</CustomButton>
        <p className={s.signInQuestion}>Already have an account?</p>
        <NavLink className={s.signInLink} to={PATH.LOGIN}>
          sign in
        </NavLink>
      </form>
    </div>
  )
}
