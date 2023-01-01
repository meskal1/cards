import { FC } from 'react'

import s from './CustomModalDialog.module.scss'

type CustomModalDialogType = {
  active: boolean
  setActive: (state: boolean) => void
  children: JSX.Element
}

export const CustomModalDialog: FC<CustomModalDialogType> = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? `${s.Modal__Active} ${s.Modal}` : s.Modal}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? `${s.Content__Active} ${s.Content}` : s.Content}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
