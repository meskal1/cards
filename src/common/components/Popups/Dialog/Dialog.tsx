import { FC, ReactNode } from 'react'

import { FooterModal } from '../FooterModal/FooterModal'
import { HeaderModal } from '../HeaderModal/HeaderModal'
import { OverlayingPopup } from '../OverlayingPopup/OverlayingPopup'

import s from './Dialog.module.scss'

type DialogType = {
  title: string
  primaryColor?: 'white' | 'red' | 'blue'
  onOkButtonText?: string
  onCloseButtonText?: string
  children: ReactNode
  onOk: () => void
  isOpened: boolean
  onClose: () => void
}

export const Dialog: FC<DialogType> = ({
  title,
  primaryColor,
  onOkButtonText,
  children,
  onOk,
  onCloseButtonText,
  isOpened,
  onClose,
}) => {
  return (
    <OverlayingPopup isOpened={isOpened} onClose={onClose}>
      <div className={s.container}>
        <HeaderModal title={title} onClose={onClose} />
        {children}
        <FooterModal
          primaryColor={primaryColor}
          primaryButtonText={onOkButtonText}
          primaryButtonOnClick={onOk}
          secondaryButtonText={onCloseButtonText}
          secondaryButtonOnClick={onClose}
        />
      </div>
    </OverlayingPopup>
  )
}
