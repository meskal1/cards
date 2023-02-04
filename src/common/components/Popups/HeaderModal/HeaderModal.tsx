import { FC, KeyboardEvent } from 'react'

import s from './HeaderModal.module.scss'

type HeaderModalType = {
  title: string
  onClose: () => void
}

export const HeaderModal: FC<HeaderModalType> = ({ title, onClose }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onClose()
    }
  }

  return (
    <div className={s.conteiner}>
      <h2 className={s.title}>{title}</h2>
      <div
        className={s.button}
        onClick={onClose}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={1}
      />
    </div>
  )
}
