import { ReactNode, FC } from 'react'

import FocusLock from 'react-focus-lock'

import { useEscapeKey } from '../../../../hooks/useEscapeKey'
import { Portal } from '../Portal/Portal'

import s from './OverlayingPopup.module.scss'

type OverlayingPopupType = {
  children: ReactNode
  isOpened: boolean
  onClose: () => void
}

export const OverlayingPopup: FC<OverlayingPopupType> = ({ children, isOpened, onClose }) => {
  if (!isOpened) {
    return null
  }

  useEscapeKey(onClose)

  return (
    <Portal>
      <FocusLock disabled={false} className={s.focusLock}>
        <div className={s.container} role="dialog">
          <div className={s.overlay} role="button" onClick={onClose} />
          {children}
        </div>
      </FocusLock>
    </Portal>
  )
}
