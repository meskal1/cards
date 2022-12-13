import React from 'react'

import Button from '@mui/material/Button'

import s from './ButtonStyled.module.scss'

type ButtonStyledType = {
  name: string
  onClick: () => void
  color?: string
}

export const ButtonStyled: React.FC<ButtonStyledType> = ({ name, onClick, ...restProps }) => {
  const style = {
    backgroundColor: restProps.color ? restProps.color : '',
    color: restProps.color === 'white' ? 'black' : '',
  }

  return (
    <>
      <Button
        type={'submit'}
        variant="contained"
        className={s.button}
        onClick={onClick}
        style={style}
      >
        {name}
      </Button>
    </>
  )
}
