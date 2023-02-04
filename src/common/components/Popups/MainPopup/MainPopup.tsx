import { FC, ReactNode } from 'react'

import { FooterModal } from '../FooterModal/FooterModal'
import { HeaderModal } from '../HeaderModal/HeaderModal'
import { OverlayingPopup } from '../OverlayingPopup/OverlayingPopup'

import s from './MainPopup.module.scss'

type MainPopupType = {
  title: string
  className?: string
  onOkButtonText?: string
  onCloseButtonText?: string
  onOk: () => void
  children: ReactNode
  isOpened: boolean
  onClose: () => void
}

export const MainPopup: FC<MainPopupType> = ({
  title,
  className,
  onOkButtonText,
  onOk,
  onCloseButtonText,
  children,
  isOpened,
  onClose,
}) => {
  return (
    <OverlayingPopup isOpened={isOpened} onClose={onClose}>
      <div className={`${s.container} ${className || ''}`}>
        <HeaderModal title={title} onClose={onClose} />
        {children}
        <FooterModal
          primaryButtonText={onOkButtonText}
          primaryButtonOnClick={onOk}
          secondaryButtonText={onCloseButtonText}
          secondaryButtonOnClick={onClose}
        />
      </div>
    </OverlayingPopup>
  )
}
