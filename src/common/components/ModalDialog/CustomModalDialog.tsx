import React from 'react'

import { Close } from '@mui/icons-material'

import s from './CustomModalDialog.module.scss'

type CustomModalDialogType = {
  active: boolean
  setActive?: (state: boolean) => void
  children: JSX.Element
}

export const CustomModalDialog: React.FC<CustomModalDialogType> = ({
  active,
  setActive,
  children,
}) => {
  return (
    <div
      className={active ? `${s.Modal__Active} ${s.Modal}` : s.Modal}
      onClick={setActive ? () => setActive(false) : () => {}}
    >
      <div
        className={active ? `${s.Content__Active} ${s.Content}` : s.Content}
        onClick={e => e.stopPropagation()}
      >
        <div className={s.Close}>
          <Close onClick={setActive ? () => setActive(false) : () => {}} />
        </div>
        {children}
      </div>
    </div>
  )
}
