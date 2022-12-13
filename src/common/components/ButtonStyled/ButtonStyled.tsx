import React from 'react'

import Button from '@mui/material/Button'

import s from './ButtonStyled.module.scss'

type ButtonStyledType = {
  name: string
  onClick?: () => void
}

export const ButtonStyled: React.FC<ButtonStyledType> = ({ name, onClick }) => {
  return (
    <>
      <Button type={'submit'} variant="contained" className={s.button} onClick={onClick}>
        {name}
      </Button>
    </>
  )
}
