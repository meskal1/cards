import React from 'react'

import Button, { ButtonProps } from '@mui/material/Button'

import s from './CustomButton.module.scss'

type ButtonCustomType = ButtonProps

export const CustomButton: React.FC<ButtonCustomType> = ({ className, ...props }) => {
  const finalClass = `${s.button} ${className ? className : ''}`

  return (
    <>
      <Button type={'submit'} variant="contained" className={finalClass}>
        {props.children}
      </Button>
    </>
  )
}
